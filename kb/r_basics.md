---
title: R Basics
layout: contentbase
---
R Basics
======

## Loading a CSV into a dataframe

```R
trans <- read.csv("C:/Users/adnan/Downloads/report_2019-12-28_114439.csv", sep=";")
```

### Print dataframe as string
```R
str(trans)

'data.frame':	77 obs. of  19 variables:
 $ account               : Factor w/ 1 level "Chase": 1 1 1 1 1 1 1 1 1 1 ...
 $ category              : Factor w/ 19 levels "Active sport, fitness",..: 8 18 17 2 8 8 8 17 17 18 ...
 $ currency              : Factor w/ 1 level "USD": 1 1 1 1 1 1 1 1 1 1 ...
 $ amount                : num  -25.22 -27.33 -8.35 -10 -8.86 ...
 $ ref_currency_amount   : num  -25.22 -27.33 -8.35 -10 -8.86 ...
 $ type                  : Factor w/ 1 level "Expenses": 1 1 1 1 1 1 1 1 1 1 ...
 $ payment_type          : Factor w/ 1 level "CASH": 1 1 1 1 1 1 1 1 1 1 ...
 $ payment_type_local    : Factor w/ 1 level "Cash": 1 1 1 1 1 1 1 1 1 1 ...
 $ note                  : Factor w/ 65 levels "","Blanket + Organizing box",..: 1 48 40 20 59 1 15 9 10 4 ...
 $ date                  : Date, format: "2019-10-06" "2019-09-18" "2019-09-18" "2019-09-17" ...
 $ gps_latitude          : logi  NA NA NA NA NA NA ...
 $ gps_longitude         : logi  NA NA NA NA NA NA ...
 $ gps_accuracy_in_meters: logi  NA NA NA NA NA NA ...
 $ warranty_in_month     : int  0 0 0 0 0 0 0 0 0 0 ...
 $ transfer              : Factor w/ 1 level "false": 1 1 1 1 1 1 1 1 1 1 ...
 $ payee                 : logi  NA NA NA NA NA NA ...
 $ labels                : Factor w/ 3 levels "","ðŸ\230\220",..: 1 1 1 1 1 1 1 1 1 1 ...
 $ envelope_id           : int  1000 2010 1001 6011 1000 1000 1000 1001 1001 2010 ...
 $ custom_category       : Factor w/ 1 level "false": 1 1 1 1 1 1 1 1 1 1 ...
```

Some values may not be parsed properly as a factor, such as
```R
class(trans$date)

#Which gives,

[1] "factor"
```

To allow it to be parsed correctly, run
```R
trans$date <- as.Date(trans$date)

class(trans$date)
#Now shows,
[1] "Date"
```

## Plotting
```R
groceries <- trans[trans$category == "Groceries",]
gro_x <- groceries$date
gro_y <- groceries$amount * -1
plot(gro_x, gro_y, type="b", pch = 19, col = "green", xlab = "Date", ylab = "Money Spent", main = "Spending Analytics")

#Can only call lines(), after calling plot() first
lines (fast_x, fast_y, type = "b", pch = 18, col = "red")

```

## Adding Text
```R
text(x, y + 1, labels=df$note, cex=0.5, font=2, col="red")
```

## Legend

```R
legend("topleft", legend = c("Line 1", "Line 2"), col = c("red", "blue"), lty = c(1, 2), cex = 0.8)
#cex controls scaling
```

## More misc stuff

```R
#Get rows and columns a.k.a. dimensions
dim(trans)
[1] 77 19

#Get dataframe summary
summary(trans)
```

## PCH Types

{: align="center"}
![PCH Types]

## Line Types

{: align="center"}
![Line Types]

[PCH Types]: /images/r/pch_types.png
{: width="40%"}
[Line Types]: /images/r/line_types.png
{: width="40%"}