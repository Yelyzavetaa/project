console.log("main.js loaded");

$(document).ready(function () {

    let data = [];
    // Function to compute density
    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, d3.mean(V, function (v) { return kernel(x - v); })];
            });
        };
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }

    function draw_density(container_id, data, column, height, width) {

        function brushed({selection}) {
            if (selection) {
            svg.property("value", selection.map(x.invert, x).map(d3.utcDay.round));
            svg.dispatch("input");
            }
        }

        function brushended({selection}) {
            if (!selection) {
                gb.call(brush.move, [0, 0]);
            } else {

            }

        }
        
        let d_column = [];
        data.forEach(function (d) {
            d_column.push(d[column]);
        });

        let count = d_column.reduce(function (value, value2) {
            return (
                value[value2] ? ++value[value2] :(value[value2] = 1),
                value
            );
        }, {});

        let max_count = Math.max(...Object.values(count));
        console.log(d_column);
        console.log(Math.max(...d_column));
        console.log(max_count);
        
        const svg = d3.select(container_id)
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .append("g");
        
            // .call(brush.move, defaultSelection);

        const x = d3.scaleLinear()
            .domain([0, Math.max(...d_column) + 1])
            .range([0, width]);
        
    

        const y = d3.scaleLinear()
            .range([height, 0])
            //.domain([0, 0.1]); // Adjust the domain as needed
            .domain([0, max_count + 1]); // Adjust the domain as needed
        //data structure is list of dicts, each dict has keys: M1, M2, M3, M4

        
        // d3.select(container_id + " svg")
        //     .append("g")
        //     .attr("transform", "translate(30, 0)")
        //     .call(d3.axisLeft(y));
        
        // d3.select(container_id + " svg")
        //     .append("g")
        //     .attr("transform", "translate(0," + 10 + ")")
        //     .call(d3.axisBottom(x).ticks(Math.max(...d_column) + 1));
        
        const kde = kernelDensityEstimator(kernelEpanechnikov(0.15), x.ticks(Math.max(...d_column) + 2)); // Adjust the bandwidth as needed
        const density = kde(d_column);
        console.log(density);
        const brush = d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("end", brushended)
            .on("brush", brushed);
        
        const gb = svg.append("g")
            .call(brush)
            .call(brush.move, [0, 0]);
        //const density = kde(data.map(function (d) { return d[column]; }));


        svg.append("path")
            .datum(density)
            .attr("fill", "#69b3a2")
            .attr("opacity", ".8")
            // .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBumpX)
                .x(function (d) { return x(d[0]); })
                .y(function (d) { return y(d[1]); })
            );
    }

    function drawAllCharts() {
        let left_side_height = $("#chart-container").height();
        let left_side_width = $("#chart-container").width();

        draw_density("#chart-container", data, "M1", left_side_height, left_side_width);
        draw_density("#chart-container1", data, "M2", left_side_height, left_side_width);
        draw_density("#chart-container2", data, "M3", left_side_height, left_side_width);
        draw_density("#chart-container3", data, "M4", left_side_height, left_side_width);
    }

    function updateWindow() {
        $("#chart-container").empty();
        $("#chart-container1").empty();
        $("#chart-container2").empty();
        $("#chart-container3").empty();
        left_side_height = $("#chart-container").height();
        left_side_width = $("#chart-container").width();
        drawAllCharts();
    }

        $.ajax({
            url: '/robots/get_results_data/',
            type: 'GET',
            dataType: 'json',
            success: function (dane) {
                console.log('Data received:', dane);
                data = dane;
                drawAllCharts();
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });

        d3.select(window).on('resize.updatesvg', updateWindow);
    });