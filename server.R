source("helpers.R")

shinyServer(function(input, output) {
  
  # Load data when app is visited
  data <- getRaw()
  
  # Filter by device ID / time range when options are updated
#   data.filt <- reactive({
#     mindate <- as.POSIXct.Date(input$dates[1]) + (input$min.hours * 60 + input$min.minutes) * 60
#     maxdate <- as.POSIXct.Date(input$dates[2]) + (input$max.hours * 60 + input$max.minutes) * 60
#     
#     subset(data, date > mindate & date < maxdate)
#   })
  
  # Populate plots
  output$timeseries <- renderPlot({
    timeseriesPlot(data)
  })
  
  output$boxplot <- renderPlot({
    boxPlot(data)
  })
  
})