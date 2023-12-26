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
        
        let d_column = [];
        data.forEach(function (d) {
            d_column.push(d[column]);
        });
        console.log(d_column);
        console.log(Math.max(...d_column));
        
        const svg = d3.select(container_id)
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .append("g");

        const x = d3.scaleLinear()
            .domain([0, Math.max(...d_column)]) // Adjust the range as needed
            .range([0, width]);

        const y = d3.scaleLinear()
            .range([height, 0])
            //.domain([0, 0.1]); // Adjust the domain as needed
            .domain(d3.extent(d_column, function (d) { return d; })).nice();
        //data structure is list of dicts, each dict has keys: M1, M2, M3, M4
        

        const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40));
        const density = kde(d_column);
        //const density = kde(data.map(function (d) { return d[column]; }));

        svg.append("path")
            .datum(density)
            .attr("fill", "#69b3a2")
            .attr("opacity", ".8")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBasis)
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