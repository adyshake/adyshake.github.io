---
title: Leetcode Cheatsheet
layout: contentbase
---
Leetcode Cheatsheet
======

### Data structures
```java
stack -> push(), pop(), peek(), search(), empty()
map -> containsKey(), put(key, value) [overwrites], get() [can return null]
```

### Arrays
```java
Arrays.fill(arr, 0);
Arrays.toString();
new ArrayList<>(Arrays.asList(1, 2, 3));
new int[] {1, 2, 3};
```

### Sorting and Searching
```java
Arrays.sort(a, Collections.reverseOrder());
Arrays.sort(logs, (log1, log2) -> {
    return -1; //log1  <  log2
    return 0;  //log1  == log2
    return 1;  //log1  >  log2
    return Integer.compare(1, 2);
    return IntegerObj1.compareTo(IntegerObj2);
    //For more techniques, https://www.baeldung.com/java-sorting
});
Arrays.binarySearch(nums, 0, nums.length, target);
```

### Strings
```java
"www.adnanshaikh.com".substring(0, 4); //-> [0,4) -> "www." | Length = 4 - 0
Character.isDigit("0");
"abc@def@ghi"split("@", 2); //-> ["abc", "def@ghi"]
```

### Binary Search
```java
int mid = left + (right - left) / 2;
```