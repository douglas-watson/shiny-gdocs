library(ggplot2)

getRaw <- function () {
  data <- read.csv(
    url("https://shinyproxy.appspot.com/script.google.com/macros/s/AKfycbxOw-Tl_r0jDV4wcnixdYdUjcNipSzgufiezRKr28Q5OAN50cIP/exec?sheet=Raw"),
    strip.white = TRUE
  )
  
  data$date = as.POSIXct(data$timestamp, tz="GMT", origin="1970-01-01")
  data
}

timeseriesPlot <- function(data) {
  qplot(date, value, data = data, colour = origin, geom = "line") + scale_x_datetime() + facet_grid(variable ~ ., scales = "free_y")
}

boxPlot <- function(data) {
  qplot(origin, value, data = data, geom = "boxplot") + facet_grid(variable ~ ., scales = "free_y")
}
