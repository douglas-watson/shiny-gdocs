# shinyUI(fluidPage(
#   verticalLayout(
#     titlePanel("Sensor data dashboard"),
#     plotOutput("timeseries"),
#     plotOutput("boxplot")
#   )  
# ))

shinyUI(fluidPage(
  verticalLayout(
    titlePanel("Sensor data dashboard"),
    fluidRow(
      column(3, 
             dateRangeInput("dates", "Date Range", start="2015-11-20"),
             fluidRow(
               column(4, h3("From:")),
               column(4, numericInput("min.hours", "hours:", value=0)),
               column(4, numericInput("min.minutes", "minutes:", value=0))
             ),
             fluidRow(
               column(4, h3("To:")),
               column(4, numericInput("max.hours", "hours:", value=23)),
               column(4, numericInput("max.minutes", "minutes:", value=59))
             )
      ),
      column(9, plotOutput("timeseries"))
    ),
    fluidRow(
      column(3),
      column(9, plotOutput("boxplot"))
    )
  )
))



