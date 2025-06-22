---
title: Convert 3D file to usdz format and display with AR Quick Look in iOS devices
date: 2019-07-16T00:35:22.761Z
tags:
  - 3D
coverImage: /images/uploads/img_2284.jpg
description: 'In short, just run `xcrun usdz_converter 3D.obj 3D.usdz`'
---
## Prerequisites:

1. MacOS with Xcode > 10 and command line installed.
   * run `xcode-select --install` to install
2. iOS > 12
3. Supported 3D file .obj or .gltf

## How to?

Just run `xcrun usdz_converter 3D.obj 3D.usdz`

Then put converted file to built-in apps such as Safari, Messages, Mail, News, and Notes can natively Quick Look usdz files of virtual objects in 3D or AR.

To quickly see my model, I airdrop my file to my iPhone files then click the 3D file you can check AR object.

```
usdz_converter
Version: 1.009

2019-07-16 09:59:09.038 usdz_converter[22708:19567081]


USAGE:
<inFilePath> <outFilePath> [options...]
	Options:
                -g groupName [groupNames ...]       Apply subsequent material properties to the named group(s).
                -m materialName [materialNames ...] Apply subsequent material properties to the named material(s).
                -h                                  Display help.
                -a                                  Generate a .usda intermediate file.  Default is .usdc.
                -l                                  Leave the intermediate .usd file in the source folder.
                -v                                  Verbose output.
                -f                    filePath      Read commands from a file.
                -texCoordSet          set           The name of the texturemap coordinate set to use if multiple exist (no quotes).
                -opacity              o             Floating point value 0.0 ... 1.0
                -color_map            filePath
                -normal_map           filePath
                -emissive_map         filePath
                -metallic_map         filePath
                -roughness_map        filePath
                -ao_map               filePath
                -color_default        r g b a        Floating point values 0.0 ... 1.0
                -normal_default       r g b a
                -emissive_default     r g b a
                -metallic_default     r g b a
                -roughness_default    r g b a
                -ao_default           r g b a

(*) Specify infield only with -v (Verbose) to display group information.
(*) '#' in the first character position of a line in a command file interprets the line as a comment.
```

  References:

  <https://developer.apple.com/augmented-reality/quick-look/>

  <https://forums.developer.apple.com/thread/107094>
