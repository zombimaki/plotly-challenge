/////////////////////////////////////////////////////////////////////////////////////////////////
// function for plotting the data charts
/////////////////////////////////////////////////////////////////////////////////////////////////

function plotCharts(id) {

    // Use D3 fetch to read the JSON file
    d3.json("Data/samples.json").then((data)=> {

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
        var trace = {
            x: filteredSampleValues,
            y: topTenOTU,
            text: labels,
            marker: {
                color: [
                'rgb((176,224,230)', // powder blue
                'rgb(0, 0, 139)',  //dark blue
                'rgb(0, 0, 205)',  //medium blue
                'rgb(0, 0, 255)',  //blue
                'rgb(135,206,250)', // light sky blue
                'rgb(0,191,255)', //deep sky blue
                'rgb(30,144,255)',  //dodger blue
                'rgb(100,149,237)', // cornflower blue
                'rgb(35,206,235)', //sky blue
                'rgb(65, 105, 225)', // royal blue    
            ]},
            type:"bar",
            orientation: "h",
        };
  
        // Create the data array for the plot
        var data = [trace];
  
        // Define the plot layout
        var layout = {
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
  
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

        /////////////////////////////////////////////////////////////////////////////////////////
        // Bubble Chart - Displays each sample for the filtered test subject
        /////////////////////////////////////////////////////////////////////////////////////////
    

    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// function to display demographic data by ID
/////////////////////////////////////////////////////////////////////////////////////////////////

function getDemo(id) {

    // Use D3 fetch to read the JSON file
    d3.json("Data/samples.json").then((data)=> {
      
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



//testing code
plotCharts("940")
getDemo("940")