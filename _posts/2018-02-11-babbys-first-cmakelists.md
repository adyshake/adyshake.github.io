---
layout: post
title: Babby's first CMakeLists.txt
description: cmake my day
featured: true
---

First off, I think writing a make file to make another make file is incredibly
unproductive, meta and probably the worst first step you can take if you're
trying to get started on a weekend project.
Also what is going on with the syntax? It's so ambiguous at times and it's
really infuriating. Take this for example.

The following are all equivalent statements:
```cmake
SET( x a b c )
SET( x a;b;c )
SET( x "a;b;c" )
SET( x;a;b;c )
```

_Delightful._

After nearly wasting an entire day to figure out how this all works, here's how
to write a basic no nonsense ```CMakeLists.txt``` for your C/C++ project.

## The Bare Minimum
You'll need the minimum following statements if you want it to generate a proper
solution for Visual Studio.

* **cmake_minimum_required**  
  Set the minimum required version of CMake.

  ```cmake
  cmake_minimum_required (VERSION 3.9)
  ```

* **project**  
  Sets the name of the Visual C++ solution file.

  ```cmake
  project (solution)
  ```

* **add_executable**  
  Set the name of the Visual C ++ project file and the path of the included
  source code. To specify multiple header files and source code, enumerate them
  with a space. Also, files in different directories can be specified relative
  to ```CMakeLists.txt```.

  ```cmake
  add_executable (project header.h source.cpp)
  ```

* **set_property**  
  Set the startup project when you hit F5, otherwise it defaults to ```ALL_BUILD```

  ```cmake
  set_property (DIRECTORY PROPERTY VS_STARTUP_PROJECT "project")
  ```

So far, you can write a minimal ```CMakeLists.txt``` to generate a basic
project. For programs that use only standard libraries, this is all right.

```cmake
 cmake_minimum_required (VERSION 3.9)

 project (solution)
 add_executable (project header.h source.cpp)

 set_property (DIRECTORY PROPERTY VS_STARTUP_PROJECT "project") 
```

## Additional Libraries
You can also use CMake to detect other libraries on your system--the only
feature I truly care about.

* **CMAKE_MODULE_PATH**  
  Set the path where CMake can search for ```Find<module-name>.cmake``` module files. CMake's default modules are
  included in ```C:\Program Files (x86)\CMake\share\cmake-3.9\Modules```. In this example, the same path
  (```CMAKE_CURRENT_SOURCE_DIR```) as ```CMakeLists.txt``` is added as the search destination.

  ```cmake
  set (CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}" ${CMAKE_MODULE_PATH}) 
  ```

* **find_package**  
  CMake retrieves the module ```Find<module-name>.cmake``` and sets a few macros. (It is necessary to write
  ```Find<module-name>.cmake``` otherwise CMake will not find it.) If the module supports it, you can specify the
  version number of the library to search in ```<VERSION>```.

  ```cmake
  find_package (<LIBRARY> <VERSION> REQUIRED)
  ```

  Depending on the module, the following macros are usually available.
  * **\<LIBRARY\>_FOUND**  
    Returns whether the library was found.  
    (e.g. ```TRUE``` or ```FALSE```)
  * **\<LIBRARY\>_INCLUDE_DIRS**  
    Path of the directory containing include files.  
    (e.g. ```C:\Program Files\LIBRARY\include```)
  * **\<LIBRARY\>_LIBRARY_DIRS**  
    The path of the directory containing the library files.  
    (e.g. ```C:\Program Files\LIBRARY\lib```)
  * **\<LIBRARY\>_LIBRARIES**   
    Path of the library file.  
    (e.g. ```C:\Program Files\LIBRARY\lib\LIBRARY.lib```)
  * **\<LIBRARY\>_DEFINITIONS**  
    Preprocessor definitions of the library.  
    (e.g. ```LIBRARY_DEFINE```)

* **include_directories**  
  Set the additional include directory in the Visual C ++ project. In your
  project property pages that would be,  
  ```[C/C++]> [General]> [Additional Include Directories]``` 

  ```cmake
  include_directories (${<LIBRARY>_INCLUDE_DIRS})
  ```

* **add_definitions**  
  Set preprocessor definitions in the Visual C ++ project.  
   ```[C/C++]> [Preprocessor]> [Preprocessor Definitions]```

  ```cmake
  add_definitions (${<LIBRARY>_DEFINITIONS})
  ```

* **link_directories**  
  Set the additional library directory in the Visual C ++ project.
  ```[Linker]> [General]> [Additional Library Directories]```

  ```cmake
  link_directories (${<LIBRARY>_LIBRARY_DIRS})
  ```

* **target_link_libraries**  
  Set the additional dependency file in the Visual C ++ project.  
  ```[Linker]> [Input]> [Additional Dependencies]```

  ```cmake
  target_link_libraries (project ${<LIBRARY>_LIBRARIES})
  ```

So now the entire script looks like this. Depending on the library, there are
may be a few things you won't need, so refer to the module and apply the 
appropriate settings for your project.  
I also added a little section to support both 32 and 64 bit builds.

```cmake
 cmake_minimum_required (VERSION 3.9)
 set (CMAKE_MODULE_PATH " ${CMAKE_CURRENT_SOURCE_DIR} " ${CMAKE_MODULE_PATH})

 project (solution)

# Support both 32 and 64 bit builds
if (${CMAKE_SIZEOF_VOID_P} MATCHES 8)
  MESSAGE("Using 64-bit libraries")
  # Add your code here
else ()
  MESSAGE("Using 32-bit libraries")
  # Add your code here
endif ()

 add_executable (project header.h source.cpp)

 set_property (DIRECTORY PROPERTY VS_STARTUP_PROJECT "project")

 # Aditional Library Settings
 find_package (<LIBRARY> <VERSION> REQUIRED)
 if (<LIBRARY>_FOUND)
   include_directories (${<LIBRARY>_INCLUDE_DIRS})
   add_definitions (${<LIBRARY>_DEFINITIONS})
   link_directories (${<LIBRARY>_LIBRARY_DIRS})
   target_link_libraries (project $ {<LIBRARY>_LIBRARIES})
 endif ()
 ```

## Generating the Project

For all the command line purists here's how its done. Make a ```build``` folder
inside of your directory otherwise cmake will polute your project with its 
build output.  
```-DCMAKE_GENERATOR_PLATFORM=x64``` specifies an ```x64``` build otherwise it
defaults to ```x86```.  
```-DCMAKE_C_FLAGS="/W4"``` raises the warning level from the default ```/W3``` to ```/W4```

```bash
mkdir build
cd build
cmake -DCMAKE_GENERATOR_PLATFORM="x64" -DCMAKE_C_FLAGS="/W4" ..
```

If for some reason that didn't work for you because Windows is being
troublesome, you can try out cmake-gui as well.  
(You can delete the cache by pressing the ```[File]> [Delete Cache]``` button
from the menu.)

1. **Launch cmake-gui**  
    Start cmake-gui, _duh_  

2. **Specify Source Code Directory and Output Directory**  

    * **Where is the source code:**  
    ```Where is the source code:``` is the source code directory. 
    Specify the directory where ```CMakeLists.txt``` is located. (eg ```C:/project``` )

    * **Where to build the binaries:**  
    ```Where to build the binaries:``` is the directory to output Visual C ++ projects ( ```*.sln``` , ```*.vcxproj``` etc). 
    Although you can specify any directory, it's recommended that you follow the out-of-source build policy. It is customary to use ```<source-directory>/build```

3. **Specify Compiler**  
    Click on the ```Configure``` button, the window for selecting the compiler is displayed. Select Visual Studio to use from the drop down menu.  
    To build for x86, select "```Visual Studio ** ****```".  
    To build for x64, select "```Visual Studio ** **** Win64```".  
    Click on ```Finish``` and the settings are made according to the development
    environment.

4. **Configuration Settings**  
    Many items such as library path are automatically set according to the
    development environment. When you change options etc., press the
    ```Configure``` button again to reflect the changes.

5. **Generate Project**  
    When you are done, press the ```Generate``` button. 
    A Visual C ++ project is created in the specified directory.

And that's it! you're done! Now you can actually move on to getting work done.  
( ◔ ʖ̯ ◔ )

