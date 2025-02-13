// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
  
    // Filter the metadata for the object with the desired sample number
    let resultArray = metadata.filter(object => object.id == sample);
    let result = resultArray[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    sampleMetadata = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (let key in result) {
      sampleMetadata.append("p").text(`${key}: ${result[key]}`);
  }})
};



// // function to build both charts
 function buildCharts(sample) {
   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

     // Get the samples field
    let samples = data.samples;

     // Filter the samples for the object with the desired sample number
    let resultArray2 = samples.filter(object => object.id == sample);
    let result2 = resultArray2[0]

     // Get the otu_ids, otu_labels, and sample_values
    let sample_values = result2.sample_values;
    let otu_ids = result2.otu_ids;
    let otu_labels = result2.otu_labels;
      
    
    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Viridis'
        }
    };

    let data1 = [trace1];
    let layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'Number of Bacteria'}
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', data1, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let data2 = [trace2];

    let layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", data2, layout2);
    }
  )
};


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    names_list = data.names

    // Use d3 to select the dropdown with id of `#selDataset`
    selDataset = d3.select("#selDataset")

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    for (let i = 0; i < names_list.length; i ++) {
      let name = names_list[i];
      let option = selDataset.append("option").text(name).attr("value", name);
    }
    // Get the first sample from the list
    sample_id = names_list[0]

    // Build charts and metadata panel with the first sample
      buildCharts(sample_id);
      buildMetadata(sample_id);

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
buildCharts(newSample);
buildMetadata(newSample);

}


// Initialize the dashboard
init();