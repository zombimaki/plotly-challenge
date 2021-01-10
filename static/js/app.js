/////////////////////////////////////////////////////////////////////////////////////////////////
// function to Initializes the page
/////////////////////////////////////////////////////////////////////////////////////////////////

function init() {

    // select the dropdown menu by selecting the id selDataset
    var dropdown = d3.select("#selDataset");

     // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // populate the dropdown with the test subject ids
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call functions to generate plots and populate demographic info
        plotCharts(data.names[0]);
        getDemo(data.names[0]);
    });
}

init();

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for change event handling
/////////////////////////////////////////////////////////////////////////////////////////////////

function optionChanged(id) {

    // call functions to generate plots and populate demographic info
    plotCharts(id);
    getDemo(id);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// function for plotting the data charts
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotCharts(id) {

    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data)=> {

        /////////////////////////////////////////////////////////////////////////////////////////
        // Bar Chart - Top 10 Operational Taxonomic Units (OTU) by filtered test subject
        /////////////////////////////////////////////////////////////////////////////////////////

        // filter sample data by test subject id 
        var filteredSample = data.samples.filter(sample => sample.id.toString() === id)[0];
        
        // top 10 sample values from filtered data
        var filteredSampleValues = filteredSample.sample_values.slice(0, 10).reverse();
  
        // top 10 otu_ids from filtered data
        var topTenOTU_stage = (filteredSample.otu_ids.slice(0, 10)).reverse();
        
        // update the format of the OTU ID from "####"" to "OTU ####""
        var topTenOTU = topTenOTU_stage.map(id => "OTU " + id)
    
        // top 10 otu_labels from filtered data
        var labels = filteredSample.otu_labels.slice(0, 10);
        
        // Create the Trace
        var traceBar = {
            x: filteredSampleValues,
            y: topTenOTU,
            text: labels,
            marker: {
                color: filteredSample.otu_ids,
                colorscale: "Viridis"
        },
            type:"bar",
            orientation: "h",
        };
  
        // Create the data array for the bar plot
        var dataBar = [traceBar];
  
        // Define the bar plot layout
        var layoutBar = {
            title: "Top 10 Operational Taxonomic Units",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 50
            }
        };
  
        // Render the bar plot to the div tag with id "bar"
        Plotly.newPlot("bar", dataBar, layoutBar);

        /////////////////////////////////////////////////////////////////////////////////////////
        // Bubble Chart - Displays each sample for the filtered test subject
        /////////////////////////////////////////////////////////////////////////////////////////
        
        var traceBubble = {
            x: filteredSample.otu_ids,
            y: filteredSample.sample_values,
            mode: "markers",
            marker: {
                size: filteredSample.sample_values,
                color: filteredSample.otu_ids,
                colorscale: "Viridis"
            },
            text: filteredSample.otu_labels
  
        };
  
        // Define the bubble plot layout
        var layoutBubble = {
            title: { text: `Sample Values by Operational Taxonomic Unit` },
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1200
        };
  
        // Create the data array for the bubble plot 
        var dataBubble = [traceBubble];
  
        // Render the bar plot to the div tag with id "bubble"
        Plotly.newPlot("bubble", dataBubble, layoutBubble); 

        /////////////////////////////////////////////////////////////////////////////////////////
        // Bonus guage chart
        /////////////////////////////////////////////////////////////////////////////////////////

        // define the metadata object
        var gaugeMeta = data.metadata;

        // filter meta data info by test subject id
        var filteredGaugeMeta = gaugeMeta.filter(meta => meta.id.toString() === id)[0];
        
        // get wfreq from the filtered
        var wfreq = filteredGaugeMeta.wfreq
        
        // define data for the gauge
        var dataGauge = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: parseFloat(wfreq),
              title: { text: "Belly Button Weekly Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [0, 9] },
                steps: [
                         {range: [0, 1], color: "#55C667FF"},
                         {range: [1, 2], color: "#3CBB75FF"},
                         {range: [2, 3], color: "#29AF7FFF"},
                         {range: [3, 4], color: "#20A387FF"},
                         {range: [4, 5], color: "#1F968BFF"},
                         {range: [5, 6], color: "#238A8DFF"},
                         {range: [6, 7], color: "#287D8EFF"},
                         {range: [7, 8], color: "#2D708EFF"},
                         {range: [8, 9], color: "#33638DFF"},
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: parseFloat(wfreq)
                }
              }
            }
          ];
          
          // Define the gauge plot layout
          var layoutGauge = { 
              width: 600, 
              height: 450, 
              margin: { t: 0, b: 0 } 
            };

        // Render the gauge plot to the div tag with id "gauge"
          Plotly.newPlot('gauge', dataGauge , layoutGauge);

    })    
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// function to display demographic data by ID
/////////////////////////////////////////////////////////////////////////////////////////////////

function getDemo(id) {

    // Use D3 fetch to read the JSON file
    d3.json("data/samples.json").then((data)=> {
      
        // define the metadata object
        var metadata = data.metadata;

        // filter meta data info by test subject id
        var filteredMetadata = metadata.filter(meta => meta.id.toString() === id)[0];

        // select the panel-body html class with the id "sample-metadata"
        var demoInfo = d3.select("#sample-metadata");
        
        // clear demographic info
        demoInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(filteredMetadata).forEach((info) => {demoInfo.append("h5").text(info[0] + ":" + info[1]);    
        });
    });
}