// data is (unique) circleID, x,y,radius, for circles centers
var circles = [[1,267, 153, 30], [2,286, 130, 12], [3,238, 155, 8],
    [4,290, 171, 1], [5,261, 272, 34], [6,289, 252, 10], [7,284, 297, 5],
    [8,245, 301, 5], [9,233, 290, 5], [10,228, 265, 5], [11,251, 241, 5],
    [12,251, 360, 36], [13,250, 327, 12], [14,283, 375, 5], [15,224, 384, 12],
    [16, 313, 206, 26], [17,336, 207, 5], [18,306, 227, 10], [19,300, 185, 8],
    [20,329, 268, 22], [21,349, 270, 10], [22,312, 280, 8,22], [23,311, 331, 26],
    [24,330, 318, 5], [25, 305, 354, 8,25], [26,288, 322, 10], [27,371, 162, 20],
    [28,384, 149, 8], [29,387, 172, 5], [30,355, 172, 10], [31,381, 235, 20,31],
    [32,403, 242, 8], [33,364, 229, 5], [34,372, 351, 20], [35,365, 366, 8],
    [36,415, 315, 18], [37,430, 325, 8], [38,400, 325, 8], [39,405, 296, 10], [40,458, 154, 18],
    [41,471, 163, 10], [42,438, 158, 8], [43,436, 216, 18], [44,450, 212, 10], [45,453, 267, 18],
    [46,450, 282, 5], [47,433, 264, 10], [48,481, 324, 16], [49,485, 338, 8], [50,467, 320, 8],
    [51,491, 369, 20], [52,512, 361, 12], [53,474, 358, 8], [54,519, 178, 16], [55,530, 165, 8],
    [56,503, 231, 16], [57,499, 244, 5], [58,487, 229, 5], [59,529, 280, 15], [60,539, 271, 5],
    [61,515, 280, 5], [62,584, 154, 12], [63,594, 161, 5], [64,567, 215, 12], [65,574, 220, 5],
    [66,591, 252, 12], [67,604, 241, 10], [68,613, 314, 12], [69,603, 316, 5], [70,632, 373, 12],
    [71,622, 365, 5], [72,625, 169, 12], [73,626, 179, 5], [74,633, 228, 12], [75,661, 183, 7],
    [76,685, 150, 7], [77,702, 174, 7], [78,692, 204, 7], [79,669, 247, 7], [80,703, 233, 7],
    [81,724, 220, 7], [82,748, 237, 7], [83,688, 268, 7], [84,671, 301, 7], [85,703, 303, 7],
    [86,728, 288, 7], [87,664, 352, 9]];
const darkOrange = "#d46900"; // rgb: 212,105,0
const darkBlue = "#001c9c"; // rgb 0,28,156
const liteBlue = "#afbdff"; // rgb(175,189,255)
const evenLiterBlue = "#c6d0ff"; //rgb(198,208,255)
const lightOrange = "#F8CBAD";//248,203,173
const purpleBlue = "#200D9D"; //32,13,157
const litePurple = "#92A6FF";//146,166,255
const lightBrown = "#FBE5D6"; //251,229,214
const lighterOrange = "#FFA651"; // 255,166,81
const anotherOrange = "#E27000";//226,112,0
var colors = [darkOrange, darkBlue, liteBlue, evenLiterBlue, lightOrange, liteBlue, purpleBlue, purpleBlue, evenLiterBlue, evenLiterBlue, evenLiterBlue, lightBrown, liteBlue, evenLiterBlue, litePurple, lighterOrange, purpleBlue, liteBlue, purpleBlue, lightOrange, darkBlue, litePurple, lightOrange, evenLiterBlue, litePurple, darkBlue, darkOrange, darkBlue, evenLiterBlue, litePurple, lightOrange, evenLiterBlue, purpleBlue, lightBrown, litePurple, lightOrange, litePurple, evenLiterBlue, litePurple, anotherOrange, liteBlue, purpleBlue, lighterOrange, litePurple, lightOrange, darkBlue, litePurple, lightOrange, purpleBlue, litePurple, lightBrown, darkBlue, liteBlue, lighterOrange, evenLiterBlue, lighterOrange, evenLiterBlue, evenLiterBlue, lightOrange, purpleBlue, litePurple, anotherOrange, liteBlue, lighterOrange, evenLiterBlue, lightOrange, litePurple, lightOrange, evenLiterBlue, lightBrown, evenLiterBlue, anotherOrange, evenLiterBlue, lighterOrange, anotherOrange, anotherOrange, anotherOrange, anotherOrange, lighterOrange, lighterOrange, lighterOrange, lighterOrange, lightOrange, lightOrange, lightOrange, lightOrange, lightBrown];

// circle's labels: x,y,r (which should be taken from the matching circle) it affects the font-size,text
var labels = [[260, 150, 30, "store"], [260, 157, 30, "open"], [260, 165, 30, "hours"], [282, 135, 12, "i5"]];

// first number is circleID , then array of rows for modal1 dialog when circleID is chosen
var intents= {1: [ ["i1" ,"information store location" , 0.72] , ["i6"  , "Make a payment" , 0.65],  ["i7","Return a product",0.54] ,["i8","a",1],["i9","b",2],["i10","c",1],["i11","d",2],["i12","e",0.62],["i14","aaa",12] ] }
var topics = {1 : "a",2 :"b"};
