console.log("main.js loaded");

$(document).ready(function () {

            // Function to compute density
            function kernelDensityEstimator(kernel, X) {
            return function(V) {
                return X.map(function(x) {
                return [x, d3.mean(V, function(v) { return kernel(x - v); })];
                });
            };
            }
            function kernelEpanechnikov(k) {
            return function(v) {
                return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
            };
            }

            function draw_density(container_id, data, height, width) {
                    // set the dimensions and margins of the graph
                const margin = {top:5, right: 25, bottom:0, left: 20};
                //     width = 360 - margin.left - margin.right,
                //     height = 75 - margin.top - margin.bottom;
                console.log(height, width)
                // append the svg object to the body of the page
                const svg = d3.select(container_id)
                    .append("svg")
                    .attr("viewBox", [0, 0, width, height])
                        .attr('preserveAspectRatio', 'xMaxYMax meet')
                    // .attr("height", "100%")
                    .append("g")
                        // .attr("transform", `translate(${margin.left},${margin.top})`)
                        .attr("height", "100%")
                        .attr('preserveAspectRatio', 'xMinYMin meet')
                    ;
                
                // get the data
                d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv").then( function(data) {
                
                // add the x Axis
                const x = d3.scaleLinear()
                            .domain([0, 1000]) // wartosci od ile do ile
                            .range([0, width]);
                // svg.append("g")
                //     .attr("transform", `translate(0, ${height})`)
                //     .call(d3.axisBottom(x));
                
                // add the y Axis
                const y = d3.scaleLinear()
                            .range([height, 0])
                            .domain([0, 0.01]); // to pewnie trzeba bedzie dostosowac
                // svg.append("g")
                //     .call(d3.axisLeft(y));
                
                // Compute kernel density estimation
                const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40))
                const density =  kde( data.map(function(d){  return d.price; }) )
                
                // Plot the area
                svg.append("path")
                    .attr("class", "mypath")
                    .datum(density)
                    .attr("fill", "#69b3a2")
                    .attr("opacity", ".8")
                    .attr("stroke", "#000")
                    .attr("stroke-width", 1)
                    .attr("stroke-linejoin", "round")
                    .attr("d",  d3.line()
                        .curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); })
                    );
                
                });
            }

            let left_side_height = $("#chart-container").height();
            let left_side_width = $("#chart-container").width();
            
            draw_density("#chart-container", null, left_side_height, left_side_width);
            draw_density("#chart-container1", null, left_side_height, left_side_width);
            draw_density("#chart-container2", null, left_side_height, left_side_width);
            draw_density("#chart-container3", null, left_side_height, left_side_width);

            function updateWindow() {
                
                $("#chart-container").empty();
                $("#chart-container1").empty();
                $("#chart-container2").empty();
                $("#chart-container3").empty();
                left_side_height = $("#chart-container").height();
                left_side_width = $("#chart-container").width();
                draw_density("#chart-container", null, left_side_height, left_side_width);
                draw_density("#chart-container1", null, left_side_height, left_side_width);
                draw_density("#chart-container2", null, left_side_height, left_side_width);
                draw_density("#chart-container3", null, left_side_height, left_side_width);
            }

            d3.select(window).on('resize.updatesvg', updateWindow);
        });