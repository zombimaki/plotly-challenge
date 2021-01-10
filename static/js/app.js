// Creating function for plotting the data charts
function plotCharts(id) {
    // Use D3 fetch to read the JSON file
    d3.json("Data/samples.json").then((data)=> {
        // console log the json data
        console.log(data)
  
        //var wfreq = data.metadata.map(d => d.wfreq)
       // console.log(`Washing Freq: ${wfreq}`)
        
        // define the filtered sample object by id 
        var sample = data.samples.filter(s => s.id.toString() === id)[0];
        
        // console log the sample object
        console.log(sample);
  
        // define the top 10 samplevalues object
        var samplevalues = sample.sample_values.slice(0, 10).reverse();
  
        // define the top 10 otu ids object
        var top_10 = (sample.otu_ids.slice(0, 10)).reverse();
        
        // define the otu object as the word "OTU" with the ids appended
        var otu = top_10.map(id => "OTU " + id)
    
        // define the top 10 labels object
        var labels = sample.otu_labels.slice(0, 10);
        
        // Create the Trace
        var trace = {
            x: samplevalues,
            y: otu,
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
            title: "Top 10 OTUs",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
  
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", data, layout);


    })
}




//testing code
plotCharts("940")
