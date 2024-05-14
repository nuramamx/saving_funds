import UIAppLayout from './components/ui/ui-app-layout';
import UIAppMenu from './components/ui/ui-app-menu';

function App() {
  const logo: string = `${process.env.PUBLIC_URL}/resources/images/logo.png`;

  return (
    <>
    <header>
        <nav className="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="699" height="705" viewBox="0 0 699 705" version="1.1"><path d="M 326.091 47.007 C 299.725 49.218, 276.828 53.951, 252.500 62.218 C 158.246 94.249, 86.068 169.274, 58.612 263.754 C 45.570 308.632, 42.911 356.783, 50.978 402.019 C 66.080 486.706, 115.516 560.098, 188.500 606.182 C 201.906 614.647, 227.749 627.500, 242.097 632.840 C 295.062 652.550, 350.852 657.134, 407.500 646.431 C 436.074 641.032, 464.830 630.716, 492.784 615.836 C 544.983 588.050, 589.278 543.409, 616.961 490.688 C 634.824 456.670, 644.422 425.852, 650.191 384 C 652.143 369.831, 651.822 325.812, 649.651 310.087 C 640.196 241.614, 608.507 178.479, 560.152 131.778 C 511.400 84.692, 449.885 55.687, 382.500 48.010 C 369.608 46.542, 338.287 45.985, 326.091 47.007 M 324 48.663 C 282.481 52.728, 246.236 63.366, 210.086 82.095 C 181.972 96.661, 159.885 112.990, 135.913 136.931 C 66.207 206.547, 35.606 303.923, 52.533 402.261 C 66.255 481.981, 114.108 554.673, 183 600.447 C 224.119 627.768, 266.783 643.217, 317.500 649.152 C 340.056 651.791, 375.945 650.583, 400.500 646.358 C 492.145 630.588, 573.170 571.345, 615.978 488.805 C 636.976 448.317, 647.589 409.786, 649.861 365.793 C 653.408 297.113, 634.570 231.234, 595.590 176 C 575.817 147.981, 545.573 118.285, 517.480 99.305 C 504.090 90.259, 478.602 76.626, 461.386 69.302 C 439.403 59.951, 405.542 51.869, 376.576 49.060 C 366.615 48.093, 332.449 47.836, 324 48.663 M 328.500 57.632 C 287.148 61.043, 252.220 71.053, 214.685 90.252 C 186.953 104.436, 165.710 120.074, 142.479 143.408 C 103.822 182.236, 79.428 225.193, 65.993 278.097 C 54.548 323.165, 54.577 373.924, 66.074 420.453 C 91.750 524.360, 173.218 605.920, 277.935 632.553 C 303.895 639.156, 315.874 640.493, 349 640.482 C 380.571 640.472, 388.820 639.681, 412.899 634.354 C 454.990 625.044, 498.455 604.057, 533 576.366 C 578.965 539.520, 614.907 484.711, 630.374 427.880 C 643.689 378.954, 644.455 326.503, 632.549 279 C 603.479 163.025, 508.885 77.466, 390.449 60.026 C 375.907 57.884, 341.540 56.557, 328.500 57.632 M 326.026 61.109 C 310.633 62.214, 297.369 64.374, 280.297 68.556 C 209.865 85.807, 148.848 128.855, 108.176 189.988 C 98.183 205.008, 82.793 235.757, 76.638 253 C 46.574 337.218, 58.512 433.977, 108.162 508.499 C 119.683 525.792, 127.907 535.914, 142.966 551.334 C 166.280 575.207, 192.260 594.121, 221.500 608.506 C 247.472 621.284, 268.600 628.314, 296.500 633.461 C 315.983 637.054, 326.893 638.001, 348.711 637.991 C 395.581 637.969, 434.575 628.948, 476.500 608.427 C 508.419 592.803, 533.340 574.352, 559.561 546.930 C 599.980 504.660, 626.832 448.741, 635.637 388.500 C 637.874 373.193, 638.188 328.369, 636.158 314 C 625.423 237.996, 590.868 174.811, 534.038 127.271 C 475.431 78.244, 403.968 55.514, 326.026 61.109 M 361.663 104.250 C 361.355 106.037, 360.799 112.540, 360.426 118.699 L 359.749 129.899 362.125 130.421 C 363.431 130.708, 367.122 131.191, 370.328 131.494 C 375.526 131.985, 376.119 131.853, 375.819 130.272 C 375.555 128.882, 374.192 128.392, 369.491 128 L 363.500 127.500 363.198 122.250 L 362.895 117 369.948 117 C 375.550 117, 377 116.692, 377 115.500 C 377 114.533, 376.023 113.996, 374.250 113.989 C 372.738 113.983, 369.813 113.699, 367.750 113.358 C 364.170 112.766, 364 112.563, 364 108.869 L 364 105 369.750 104.985 C 377.392 104.964, 379.665 103.556, 374.411 102.097 C 372.260 101.500, 368.638 101.009, 366.361 101.006 C 362.472 101, 362.189 101.196, 361.663 104.250 M 312.500 103.889 C 309.597 104.521, 309.510 104.703, 309.822 109.521 C 309.999 112.259, 310.674 118.775, 311.322 124 C 312.645 134.666, 312.235 134.314, 321.462 132.700 C 332.020 130.853, 335.509 126.708, 334.796 116.853 C 334.477 112.448, 333.780 110.383, 331.937 108.385 C 327.490 103.563, 320.951 102.051, 312.500 103.889 M 314.250 106.656 C 312.723 106.984, 312.021 107.839, 312.066 109.320 C 312.222 114.488, 314.696 129.094, 315.558 129.936 C 316.132 130.498, 318.434 130.492, 321.453 129.921 C 330.412 128.227, 334.808 121.262, 331.664 113.739 C 330.841 111.768, 328.998 109.390, 327.569 108.453 C 324.896 106.702, 318.225 105.801, 314.250 106.656 M 443.385 124.192 C 437.883 128.371, 424 141.193, 424 142.094 C 424 143.786, 426.836 143.009, 429.818 140.500 C 433.418 137.471, 434.449 137.426, 440.373 140.047 C 444.693 141.958, 445 142.343, 445 145.856 C 445 147.925, 445.661 150.491, 446.468 151.559 C 447.780 153.293, 447.940 151.817, 447.968 137.750 C 447.986 129.088, 447.611 122, 447.135 122 C 446.659 122, 444.972 122.986, 443.385 124.192 M 234.206 129.143 C 230.417 131.569, 227 137.589, 227 141.838 C 227 152.024, 236.868 159.697, 246.500 157 C 259.530 153.352, 262.175 135.955, 250.759 128.995 C 246.303 126.278, 238.573 126.347, 234.206 129.143 M 440.158 131.337 C 438.421 133.129, 437 134.867, 437 135.200 C 437 135.812, 442.585 138, 444.149 138 C 445.254 138, 445.262 129.280, 444.158 128.598 C 443.696 128.312, 441.896 129.544, 440.158 131.337 M 234.770 132.101 C 233.201 133.272, 231.590 135.809, 230.981 138.069 C 227.209 152.077, 243.251 160.810, 252.520 149.794 C 257.019 144.448, 255.085 134.835, 248.810 131.353 C 245.204 129.352, 237.935 129.739, 234.770 132.101 M 479.252 147.750 C 472.937 156.383, 468 163.701, 468 164.430 C 468 166.375, 471.365 164.321, 474.752 160.309 L 478.711 155.618 483.856 159.394 C 486.685 161.471, 488.990 163.470, 488.977 163.835 C 488.965 164.201, 487.419 166.967, 485.542 169.982 C 483.666 172.997, 482.261 175.595, 482.422 175.755 C 482.582 175.916, 483.483 175.752, 484.424 175.391 C 486.093 174.750, 501 154.554, 501 152.934 C 501 150.390, 498.748 151.613, 495.437 155.954 L 491.666 160.899 488.583 158.762 C 486.887 157.586, 484.328 155.668, 482.896 154.500 L 480.292 152.374 483.105 148.437 C 485.893 144.535, 486.839 141, 485.095 141 C 484.597 141, 481.967 144.037, 479.252 147.750 M 192.173 159.060 C 189.478 160.140, 181 166.895, 181 167.962 C 181 168.843, 198.887 190, 199.632 190 C 200.988 190, 209.186 182.435, 210.986 179.523 C 213.478 175.491, 213.510 171.719, 211.096 166.405 C 207.921 159.414, 199.471 156.134, 192.173 159.060 M 189.696 163.978 C 187.113 165.616, 185 167.448, 185 168.050 C 185 169.215, 198.959 186.001, 199.927 185.999 C 201.013 185.996, 206.427 180.897, 208.205 178.202 C 211.225 173.622, 210.551 169.315, 206.118 164.882 C 201.105 159.869, 196.568 159.620, 189.696 163.978 M 323.500 175.519 C 256.760 186.305, 203.065 231.652, 182.425 294.660 C 176.179 313.727, 174.539 324.891, 174.519 348.500 C 174.499 370.992, 175.215 377.114, 180.021 395.500 C 192.154 441.919, 223.966 481.442, 268 504.803 C 316.852 530.720, 377.528 531.319, 427.332 506.376 C 491.227 474.375, 529.274 407.456, 523.917 336.500 C 520.950 297.200, 507.134 263.907, 481.445 234.156 C 456.197 204.916, 422.792 185.435, 383.394 176.975 C 370.230 174.149, 336.981 173.340, 323.500 175.519 M 515.319 180.071 C 509.572 182.916, 507.598 186.242, 507.544 193.174 C 507.492 199.937, 509.552 203.313, 515.894 206.855 C 519.323 208.771, 520.939 209.086, 524.550 208.545 C 538.970 206.382, 542.942 187.739, 530.532 180.466 C 525.398 177.457, 520.839 177.339, 515.319 180.071 M 517.500 182.403 C 512.315 184.691, 510.500 187.591, 510.500 193.586 C 510.500 198.275, 510.900 199.361, 513.628 202.090 C 517.233 205.694, 523.882 206.952, 527.904 204.791 C 533.875 201.583, 536.407 193.766, 533.475 187.588 C 530.619 181.570, 524.146 179.469, 517.500 182.403 M 158.571 191.885 C 158.271 192.371, 161.709 195.620, 166.213 199.104 L 174.401 205.438 171.151 206.103 C 169.362 206.469, 163.197 207.088, 157.450 207.480 C 151.702 207.872, 147 208.496, 147 208.866 C 147 209.237, 151.494 213.051, 156.987 217.341 C 163.978 222.802, 167.649 225.046, 169.223 224.821 C 171.132 224.549, 170.303 223.546, 163.736 218.186 C 159.481 214.713, 156 211.516, 156 211.082 C 156 210.648, 161.727 209.974, 168.728 209.585 C 175.728 209.196, 181.623 208.710, 181.828 208.505 C 182.610 207.723, 180.718 206.001, 170.963 198.618 C 160.829 190.948, 159.572 190.265, 158.571 191.885 M 556.473 221.355 C 555.388 222.100, 551.800 224.196, 548.500 226.012 C 539.269 231.094, 535 233.932, 535 234.988 C 535 236.088, 537.816 235.155, 543.966 232.017 C 546.185 230.885, 548 230.432, 548 231.010 C 548 231.588, 546.850 234.793, 545.444 238.134 C 544.038 241.475, 543.025 245.398, 543.194 246.854 C 543.456 249.123, 543.975 248.533, 546.829 242.717 L 550.158 235.934 553.447 237.967 C 557.709 240.601, 561.413 240.546, 563.961 237.811 C 566.677 234.896, 566.532 230.983, 563.483 224.967 C 560.833 219.737, 559.688 219.147, 556.473 221.355 M 554.750 226.071 C 552.688 227.158, 551 228.420, 551 228.876 C 551 229.332, 552.030 231.233, 553.290 233.102 C 555.882 236.949, 560.466 237.794, 562.369 234.776 C 563.568 232.877, 561.364 224.885, 559.500 224.370 C 558.950 224.218, 556.813 224.983, 554.750 226.071 M 132 238.704 C 129.683 239.547, 124.977 244.201, 123.411 247.200 C 120.338 253.082, 122.652 261.107, 128.766 265.771 C 131.534 267.882, 133.350 268.429, 137.600 268.429 C 143.634 268.429, 146.983 266.526, 150.839 260.908 C 155.453 254.186, 152.256 243.247, 144.619 239.623 C 141.299 238.048, 135.053 237.593, 132 238.704 M 130.307 243.079 C 124.218 246.979, 123.522 256.136, 128.880 261.871 C 134.211 267.578, 141.954 267.306, 146.958 261.235 C 151.147 256.153, 151.272 249.560, 147.250 245.809 C 141.523 240.468, 135.818 239.549, 130.307 243.079 M 262.362 245.500 C 261.138 248.689, 262.773 249.719, 270.166 250.420 C 282.247 251.564, 288.552 254.456, 291.765 260.329 C 293.362 263.248, 293.523 269.663, 293.791 340.983 C 294.091 420.964, 293.739 430.032, 290.136 435 C 286.842 439.542, 280.995 441.960, 271.364 442.762 C 262.773 443.477, 262.500 443.577, 262.500 446 L 262.500 448.500 310 448.500 L 357.500 448.500 357.500 446 C 357.500 443.595, 357.194 443.475, 349.406 442.829 C 340.655 442.103, 334.908 440.176, 331.135 436.702 C 326.128 432.094, 326 430.894, 326 388.532 L 326 349 350.750 349.006 C 376.416 349.011, 381.187 349.583, 386.378 353.273 C 390.033 355.871, 393.651 363.838, 394.540 371.250 C 395.202 376.762, 395.350 377, 398.115 377 L 401 377 401 342.500 L 401 308 398.083 308 C 395.380 308, 395.084 308.379, 394.059 313.159 C 392.666 319.655, 389.530 326.807, 386.800 329.712 C 382.058 334.761, 377.486 335.500, 351 335.500 L 326.500 335.500 326.238 295.670 L 325.977 255.840 360.238 256.213 C 397.432 256.619, 399.323 256.876, 408.178 262.736 C 412.918 265.873, 418.851 274.584, 421.850 282.809 C 423.197 286.503, 424.691 289, 425.554 289 C 426.773 289, 427 285.462, 427 266.500 L 427 244 344.969 244 C 272.974 244, 262.867 244.184, 262.362 245.500 M 566.634 265.975 C 560.107 268.097, 554.287 270.313, 553.700 270.900 C 551.638 272.962, 553.992 273.248, 560.188 271.688 C 563.629 270.821, 566.541 270.207, 566.658 270.325 C 566.776 270.442, 564.876 273.641, 562.436 277.433 C 557.355 285.330, 556.513 288.742, 560.587 284.924 C 562.010 283.591, 563.907 281.262, 564.803 279.750 C 566.797 276.383, 566.994 276.377, 571.674 279.554 C 580.442 285.504, 586.916 277.329, 582.391 266.020 C 581.507 263.809, 580.269 262.026, 579.641 262.059 C 579.014 262.091, 573.160 263.853, 566.634 265.975 M 574.500 266.519 C 569.904 267.852, 569.296 269.380, 571.380 274.366 C 573.036 278.331, 576.983 280.089, 579.513 277.989 C 581.287 276.517, 581.382 271.508, 579.705 267.930 C 578.553 265.473, 578.323 265.411, 574.500 266.519 M 109.516 290.307 C 108.757 292.125, 107.992 295.368, 107.817 297.512 L 107.500 301.411 118.506 304.032 C 134.351 307.805, 136 308.080, 136 306.954 C 136 305.780, 133.125 304.478, 127.269 303.001 L 123.038 301.933 123.588 295.717 C 124.102 289.918, 124.032 289.632, 122.549 291.469 C 121.675 292.552, 120.493 295.170, 119.923 297.286 C 118.934 300.958, 118.740 301.103, 115.693 300.449 C 111.088 299.462, 111.139 299.558, 111.734 293 C 112.342 286.290, 111.581 285.366, 109.516 290.307 M 573.271 309.964 C 567.757 312.467, 565.007 316.971, 565.007 323.500 C 565.007 329.896, 567.619 334.255, 573.137 337.070 C 584.270 342.750, 597.355 333.520, 595.519 321.281 C 594.692 315.762, 590.401 310.736, 585.182 309.173 C 579.924 307.597, 578.237 307.709, 573.271 309.964 M 574.198 312.673 C 565.912 316.756, 565.903 330.313, 574.183 334.594 C 578.413 336.782, 585.324 335.983, 588.574 332.931 C 594.283 327.567, 593.538 317.617, 587.102 313.287 C 583.121 310.608, 578.805 310.402, 574.198 312.673 M 470 529.110 C 465.528 530.868, 457 536.394, 457 537.533 C 457 538.552, 472.089 562.339, 474.037 564.392 C 475.105 565.517, 483.364 560.284, 487.891 555.612 C 499.116 544.031, 485.049 523.193, 470 529.110 M 225.235 531.037 C 221.195 532.660, 220.579 536.540, 222.971 545.304 C 225.692 555.273, 224.734 558.946, 219.405 558.985 C 216.841 559.003, 214.387 556.426, 213.470 552.750 C 212.523 548.956, 210 549.164, 210 553.035 C 210 562.730, 222.865 566.224, 227.462 557.778 L 229.423 554.173 227.114 546.182 C 224.406 536.809, 224.845 533.729, 228.822 534.192 C 230.524 534.390, 232.194 535.650, 233.486 537.711 C 237.073 543.432, 239.649 541.089, 236.490 534.980 C 234.091 530.342, 230.285 529.008, 225.235 531.037 M 468.332 533.487 C 459.970 537.710, 459.975 537.444, 468.044 549.930 L 475.206 561.012 479.223 558.756 C 487.905 553.880, 490.715 547.105, 487.091 539.783 C 482.954 531.425, 476.623 529.300, 468.332 533.487 M 262.655 551.739 C 259.570 557.787, 251.988 579.383, 252.720 580.035 C 253.799 580.998, 267.261 586, 268.771 586 C 269.447 586, 270 585.380, 270 584.622 C 270 583.853, 267.338 582.248, 263.979 580.992 C 260.667 579.754, 257.700 578.324, 257.385 577.814 C 257.071 577.305, 257.791 574.478, 258.987 571.531 L 261.162 566.174 268.250 568.585 C 272.148 569.911, 275.551 570.783, 275.811 570.522 C 276.840 569.493, 273.600 567.025, 268.378 564.861 C 262.502 562.425, 262.436 562.244, 264.982 555.548 L 265.947 553.008 270.724 554.861 C 278.237 557.775, 281 558.257, 281 556.656 C 281 555.281, 271.975 550.806, 266.781 549.606 C 264.509 549.081, 263.832 549.430, 262.655 551.739 M 430.730 549.603 C 429.996 550.337, 434.480 562.631, 439.420 573.426 C 442.202 579.505, 443.321 581.079, 444.224 580.176 C 445.127 579.273, 444.398 576.527, 441.097 568.393 C 433.187 548.899, 432.564 547.770, 430.730 549.603 M 398.500 560.501 C 397.950 560.689, 395.475 561.116, 393 561.451 C 385.151 562.511, 385.269 561.884, 389.542 579.918 C 391.815 589.509, 393.797 595.895, 394.432 595.675 C 395.627 595.261, 395.652 592.879, 394.543 585.423 L 393.788 580.345 399.886 578.122 C 406.542 575.695, 408 573.978, 408 568.566 C 408 565.167, 405.291 561, 403.082 561 C 402.577 561, 401.564 560.811, 400.832 560.579 C 400.099 560.348, 399.050 560.312, 398.500 560.501 M 301.385 562.186 C 300.717 563.267, 302.676 564.958, 304.628 564.985 C 308.028 565.031, 307.930 567.385, 303.463 592.835 C 302.970 595.640, 303.155 596.117, 304.626 595.833 C 306.038 595.562, 306.870 592.795, 308.938 581.498 L 311.500 567.500 315.250 567.190 C 320.752 566.734, 319.933 564.527, 313.749 563.143 C 305.642 561.329, 302.085 561.054, 301.385 562.186 M 391.750 564.689 C 390.757 564.949, 390.002 566.088, 390.006 567.323 C 390.011 569.483, 391.844 577, 392.366 577 C 392.515 577, 394.961 576.310, 397.801 575.466 C 403.996 573.627, 405.741 571.203, 403.962 566.909 C 402.865 564.260, 402.344 564.010, 398.129 564.116 C 395.583 564.180, 392.712 564.438, 391.750 564.689 M 343.260 566.766 C 342.654 568.345, 343.921 598.063, 344.644 599.234 C 345.843 601.174, 363 599.465, 363 597.406 C 363 596.449, 360.861 596.004, 355.250 595.792 L 347.500 595.500 347.500 589.500 L 347.500 583.500 355 583 C 360.778 582.615, 362.500 582.156, 362.500 581 C 362.500 579.928, 361.359 579.481, 358.500 579.433 C 356.300 579.397, 352.813 579.284, 350.750 579.183 L 347 579 347 574 L 347 569 354.500 569 C 360.987 569, 362 568.763, 362 567.244 C 362 565.701, 360.892 565.481, 352.896 565.434 C 346.021 565.393, 343.661 565.720, 343.260 566.766" stroke="none" fill="#ec38c4" fill-rule="evenodd"/><path d="M -0 352.501 L -0 705.003 349.750 704.751 L 699.500 704.500 699.751 352.250 L 700.003 0 350.001 0 L 0 0 -0 352.501 M 0.494 353 C 0.494 546.875, 0.609 626.188, 0.750 529.250 C 0.891 432.313, 0.891 273.688, 0.750 176.750 C 0.609 79.813, 0.494 159.125, 0.494 353 M 326.091 47.007 C 299.725 49.218, 276.828 53.951, 252.500 62.218 C 158.246 94.249, 86.068 169.274, 58.612 263.754 C 45.570 308.632, 42.911 356.783, 50.978 402.019 C 66.080 486.706, 115.516 560.098, 188.500 606.182 C 201.906 614.647, 227.749 627.500, 242.097 632.840 C 295.062 652.550, 350.852 657.134, 407.500 646.431 C 436.074 641.032, 464.830 630.716, 492.784 615.836 C 544.983 588.050, 589.278 543.409, 616.961 490.688 C 634.824 456.670, 644.422 425.852, 650.191 384 C 652.143 369.831, 651.822 325.812, 649.651 310.087 C 640.196 241.614, 608.507 178.479, 560.152 131.778 C 511.400 84.692, 449.885 55.687, 382.500 48.010 C 369.608 46.542, 338.287 45.985, 326.091 47.007 M 324 48.663 C 282.481 52.728, 246.236 63.366, 210.086 82.095 C 181.972 96.661, 159.885 112.990, 135.913 136.931 C 66.207 206.547, 35.606 303.923, 52.533 402.261 C 66.255 481.981, 114.108 554.673, 183 600.447 C 224.119 627.768, 266.783 643.217, 317.500 649.152 C 340.056 651.791, 375.945 650.583, 400.500 646.358 C 492.145 630.588, 573.170 571.345, 615.978 488.805 C 636.976 448.317, 647.589 409.786, 649.861 365.793 C 653.408 297.113, 634.570 231.234, 595.590 176 C 575.817 147.981, 545.573 118.285, 517.480 99.305 C 504.090 90.259, 478.602 76.626, 461.386 69.302 C 439.403 59.951, 405.542 51.869, 376.576 49.060 C 366.615 48.093, 332.449 47.836, 324 48.663 M 328.500 57.632 C 287.148 61.043, 252.220 71.053, 214.685 90.252 C 186.953 104.436, 165.710 120.074, 142.479 143.408 C 103.822 182.236, 79.428 225.193, 65.993 278.097 C 54.548 323.165, 54.577 373.924, 66.074 420.453 C 91.750 524.360, 173.218 605.920, 277.935 632.553 C 303.895 639.156, 315.874 640.493, 349 640.482 C 380.571 640.472, 388.820 639.681, 412.899 634.354 C 454.990 625.044, 498.455 604.057, 533 576.366 C 578.965 539.520, 614.907 484.711, 630.374 427.880 C 643.689 378.954, 644.455 326.503, 632.549 279 C 603.479 163.025, 508.885 77.466, 390.449 60.026 C 375.907 57.884, 341.540 56.557, 328.500 57.632 M 326.026 61.109 C 310.633 62.214, 297.369 64.374, 280.297 68.556 C 209.865 85.807, 148.848 128.855, 108.176 189.988 C 98.183 205.008, 82.793 235.757, 76.638 253 C 46.574 337.218, 58.512 433.977, 108.162 508.499 C 119.683 525.792, 127.907 535.914, 142.966 551.334 C 166.280 575.207, 192.260 594.121, 221.500 608.506 C 247.472 621.284, 268.600 628.314, 296.500 633.461 C 315.983 637.054, 326.893 638.001, 348.711 637.991 C 395.581 637.969, 434.575 628.948, 476.500 608.427 C 508.419 592.803, 533.340 574.352, 559.561 546.930 C 599.980 504.660, 626.832 448.741, 635.637 388.500 C 637.874 373.193, 638.188 328.369, 636.158 314 C 625.423 237.996, 590.868 174.811, 534.038 127.271 C 475.431 78.244, 403.968 55.514, 326.026 61.109 M 361.663 104.250 C 361.355 106.037, 360.799 112.540, 360.426 118.699 L 359.749 129.899 362.125 130.421 C 363.431 130.708, 367.122 131.191, 370.328 131.494 C 375.526 131.985, 376.119 131.853, 375.819 130.272 C 375.555 128.882, 374.192 128.392, 369.491 128 L 363.500 127.500 363.198 122.250 L 362.895 117 369.948 117 C 375.550 117, 377 116.692, 377 115.500 C 377 114.533, 376.023 113.996, 374.250 113.989 C 372.738 113.983, 369.813 113.699, 367.750 113.358 C 364.170 112.766, 364 112.563, 364 108.869 L 364 105 369.750 104.985 C 377.392 104.964, 379.665 103.556, 374.411 102.097 C 372.260 101.500, 368.638 101.009, 366.361 101.006 C 362.472 101, 362.189 101.196, 361.663 104.250 M 312.500 103.889 C 309.597 104.521, 309.510 104.703, 309.822 109.521 C 309.999 112.259, 310.674 118.775, 311.322 124 C 312.645 134.666, 312.235 134.314, 321.462 132.700 C 332.020 130.853, 335.509 126.708, 334.796 116.853 C 334.477 112.448, 333.780 110.383, 331.937 108.385 C 327.490 103.563, 320.951 102.051, 312.500 103.889 M 314.250 106.656 C 312.723 106.984, 312.021 107.839, 312.066 109.320 C 312.222 114.488, 314.696 129.094, 315.558 129.936 C 316.132 130.498, 318.434 130.492, 321.453 129.921 C 330.412 128.227, 334.808 121.262, 331.664 113.739 C 330.841 111.768, 328.998 109.390, 327.569 108.453 C 324.896 106.702, 318.225 105.801, 314.250 106.656 M 443.385 124.192 C 437.883 128.371, 424 141.193, 424 142.094 C 424 143.786, 426.836 143.009, 429.818 140.500 C 433.418 137.471, 434.449 137.426, 440.373 140.047 C 444.693 141.958, 445 142.343, 445 145.856 C 445 147.925, 445.661 150.491, 446.468 151.559 C 447.780 153.293, 447.940 151.817, 447.968 137.750 C 447.986 129.088, 447.611 122, 447.135 122 C 446.659 122, 444.972 122.986, 443.385 124.192 M 234.206 129.143 C 230.417 131.569, 227 137.589, 227 141.838 C 227 152.024, 236.868 159.697, 246.500 157 C 259.530 153.352, 262.175 135.955, 250.759 128.995 C 246.303 126.278, 238.573 126.347, 234.206 129.143 M 440.158 131.337 C 438.421 133.129, 437 134.867, 437 135.200 C 437 135.812, 442.585 138, 444.149 138 C 445.254 138, 445.262 129.280, 444.158 128.598 C 443.696 128.312, 441.896 129.544, 440.158 131.337 M 234.770 132.101 C 233.201 133.272, 231.590 135.809, 230.981 138.069 C 227.209 152.077, 243.251 160.810, 252.520 149.794 C 257.019 144.448, 255.085 134.835, 248.810 131.353 C 245.204 129.352, 237.935 129.739, 234.770 132.101 M 479.252 147.750 C 472.937 156.383, 468 163.701, 468 164.430 C 468 166.375, 471.365 164.321, 474.752 160.309 L 478.711 155.618 483.856 159.394 C 486.685 161.471, 488.990 163.470, 488.977 163.835 C 488.965 164.201, 487.419 166.967, 485.542 169.982 C 483.666 172.997, 482.261 175.595, 482.422 175.755 C 482.582 175.916, 483.483 175.752, 484.424 175.391 C 486.093 174.750, 501 154.554, 501 152.934 C 501 150.390, 498.748 151.613, 495.437 155.954 L 491.666 160.899 488.583 158.762 C 486.887 157.586, 484.328 155.668, 482.896 154.500 L 480.292 152.374 483.105 148.437 C 485.893 144.535, 486.839 141, 485.095 141 C 484.597 141, 481.967 144.037, 479.252 147.750 M 192.173 159.060 C 189.478 160.140, 181 166.895, 181 167.962 C 181 168.843, 198.887 190, 199.632 190 C 200.988 190, 209.186 182.435, 210.986 179.523 C 213.478 175.491, 213.510 171.719, 211.096 166.405 C 207.921 159.414, 199.471 156.134, 192.173 159.060 M 189.696 163.978 C 187.113 165.616, 185 167.448, 185 168.050 C 185 169.215, 198.959 186.001, 199.927 185.999 C 201.013 185.996, 206.427 180.897, 208.205 178.202 C 211.225 173.622, 210.551 169.315, 206.118 164.882 C 201.105 159.869, 196.568 159.620, 189.696 163.978 M 323.500 175.519 C 256.760 186.305, 203.065 231.652, 182.425 294.660 C 176.179 313.727, 174.539 324.891, 174.519 348.500 C 174.499 370.992, 175.215 377.114, 180.021 395.500 C 192.154 441.919, 223.966 481.442, 268 504.803 C 316.852 530.720, 377.528 531.319, 427.332 506.376 C 491.227 474.375, 529.274 407.456, 523.917 336.500 C 520.950 297.200, 507.134 263.907, 481.445 234.156 C 456.197 204.916, 422.792 185.435, 383.394 176.975 C 370.230 174.149, 336.981 173.340, 323.500 175.519 M 515.319 180.071 C 509.572 182.916, 507.598 186.242, 507.544 193.174 C 507.492 199.937, 509.552 203.313, 515.894 206.855 C 519.323 208.771, 520.939 209.086, 524.550 208.545 C 538.970 206.382, 542.942 187.739, 530.532 180.466 C 525.398 177.457, 520.839 177.339, 515.319 180.071 M 517.500 182.403 C 512.315 184.691, 510.500 187.591, 510.500 193.586 C 510.500 198.275, 510.900 199.361, 513.628 202.090 C 517.233 205.694, 523.882 206.952, 527.904 204.791 C 533.875 201.583, 536.407 193.766, 533.475 187.588 C 530.619 181.570, 524.146 179.469, 517.500 182.403 M 158.571 191.885 C 158.271 192.371, 161.709 195.620, 166.213 199.104 L 174.401 205.438 171.151 206.103 C 169.362 206.469, 163.197 207.088, 157.450 207.480 C 151.702 207.872, 147 208.496, 147 208.866 C 147 209.237, 151.494 213.051, 156.987 217.341 C 163.978 222.802, 167.649 225.046, 169.223 224.821 C 171.132 224.549, 170.303 223.546, 163.736 218.186 C 159.481 214.713, 156 211.516, 156 211.082 C 156 210.648, 161.727 209.974, 168.728 209.585 C 175.728 209.196, 181.623 208.710, 181.828 208.505 C 182.610 207.723, 180.718 206.001, 170.963 198.618 C 160.829 190.948, 159.572 190.265, 158.571 191.885 M 556.473 221.355 C 555.388 222.100, 551.800 224.196, 548.500 226.012 C 539.269 231.094, 535 233.932, 535 234.988 C 535 236.088, 537.816 235.155, 543.966 232.017 C 546.185 230.885, 548 230.432, 548 231.010 C 548 231.588, 546.850 234.793, 545.444 238.134 C 544.038 241.475, 543.025 245.398, 543.194 246.854 C 543.456 249.123, 543.975 248.533, 546.829 242.717 L 550.158 235.934 553.447 237.967 C 557.709 240.601, 561.413 240.546, 563.961 237.811 C 566.677 234.896, 566.532 230.983, 563.483 224.967 C 560.833 219.737, 559.688 219.147, 556.473 221.355 M 554.750 226.071 C 552.688 227.158, 551 228.420, 551 228.876 C 551 229.332, 552.030 231.233, 553.290 233.102 C 555.882 236.949, 560.466 237.794, 562.369 234.776 C 563.568 232.877, 561.364 224.885, 559.500 224.370 C 558.950 224.218, 556.813 224.983, 554.750 226.071 M 132 238.704 C 129.683 239.547, 124.977 244.201, 123.411 247.200 C 120.338 253.082, 122.652 261.107, 128.766 265.771 C 131.534 267.882, 133.350 268.429, 137.600 268.429 C 143.634 268.429, 146.983 266.526, 150.839 260.908 C 155.453 254.186, 152.256 243.247, 144.619 239.623 C 141.299 238.048, 135.053 237.593, 132 238.704 M 130.307 243.079 C 124.218 246.979, 123.522 256.136, 128.880 261.871 C 134.211 267.578, 141.954 267.306, 146.958 261.235 C 151.147 256.153, 151.272 249.560, 147.250 245.809 C 141.523 240.468, 135.818 239.549, 130.307 243.079 M 262.362 245.500 C 261.138 248.689, 262.773 249.719, 270.166 250.420 C 282.247 251.564, 288.552 254.456, 291.765 260.329 C 293.362 263.248, 293.523 269.663, 293.791 340.983 C 294.091 420.964, 293.739 430.032, 290.136 435 C 286.842 439.542, 280.995 441.960, 271.364 442.762 C 262.773 443.477, 262.500 443.577, 262.500 446 L 262.500 448.500 310 448.500 L 357.500 448.500 357.500 446 C 357.500 443.595, 357.194 443.475, 349.406 442.829 C 340.655 442.103, 334.908 440.176, 331.135 436.702 C 326.128 432.094, 326 430.894, 326 388.532 L 326 349 350.750 349.006 C 376.416 349.011, 381.187 349.583, 386.378 353.273 C 390.033 355.871, 393.651 363.838, 394.540 371.250 C 395.202 376.762, 395.350 377, 398.115 377 L 401 377 401 342.500 L 401 308 398.083 308 C 395.380 308, 395.084 308.379, 394.059 313.159 C 392.666 319.655, 389.530 326.807, 386.800 329.712 C 382.058 334.761, 377.486 335.500, 351 335.500 L 326.500 335.500 326.238 295.670 L 325.977 255.840 360.238 256.213 C 397.432 256.619, 399.323 256.876, 408.178 262.736 C 412.918 265.873, 418.851 274.584, 421.850 282.809 C 423.197 286.503, 424.691 289, 425.554 289 C 426.773 289, 427 285.462, 427 266.500 L 427 244 344.969 244 C 272.974 244, 262.867 244.184, 262.362 245.500 M 566.634 265.975 C 560.107 268.097, 554.287 270.313, 553.700 270.900 C 551.638 272.962, 553.992 273.248, 560.188 271.688 C 563.629 270.821, 566.541 270.207, 566.658 270.325 C 566.776 270.442, 564.876 273.641, 562.436 277.433 C 557.355 285.330, 556.513 288.742, 560.587 284.924 C 562.010 283.591, 563.907 281.262, 564.803 279.750 C 566.797 276.383, 566.994 276.377, 571.674 279.554 C 580.442 285.504, 586.916 277.329, 582.391 266.020 C 581.507 263.809, 580.269 262.026, 579.641 262.059 C 579.014 262.091, 573.160 263.853, 566.634 265.975 M 574.500 266.519 C 569.904 267.852, 569.296 269.380, 571.380 274.366 C 573.036 278.331, 576.983 280.089, 579.513 277.989 C 581.287 276.517, 581.382 271.508, 579.705 267.930 C 578.553 265.473, 578.323 265.411, 574.500 266.519 M 109.516 290.307 C 108.757 292.125, 107.992 295.368, 107.817 297.512 L 107.500 301.411 118.506 304.032 C 134.351 307.805, 136 308.080, 136 306.954 C 136 305.780, 133.125 304.478, 127.269 303.001 L 123.038 301.933 123.588 295.717 C 124.102 289.918, 124.032 289.632, 122.549 291.469 C 121.675 292.552, 120.493 295.170, 119.923 297.286 C 118.934 300.958, 118.740 301.103, 115.693 300.449 C 111.088 299.462, 111.139 299.558, 111.734 293 C 112.342 286.290, 111.581 285.366, 109.516 290.307 M 573.271 309.964 C 567.757 312.467, 565.007 316.971, 565.007 323.500 C 565.007 329.896, 567.619 334.255, 573.137 337.070 C 584.270 342.750, 597.355 333.520, 595.519 321.281 C 594.692 315.762, 590.401 310.736, 585.182 309.173 C 579.924 307.597, 578.237 307.709, 573.271 309.964 M 574.198 312.673 C 565.912 316.756, 565.903 330.313, 574.183 334.594 C 578.413 336.782, 585.324 335.983, 588.574 332.931 C 594.283 327.567, 593.538 317.617, 587.102 313.287 C 583.121 310.608, 578.805 310.402, 574.198 312.673 M 470 529.110 C 465.528 530.868, 457 536.394, 457 537.533 C 457 538.552, 472.089 562.339, 474.037 564.392 C 475.105 565.517, 483.364 560.284, 487.891 555.612 C 499.116 544.031, 485.049 523.193, 470 529.110 M 225.235 531.037 C 221.195 532.660, 220.579 536.540, 222.971 545.304 C 225.692 555.273, 224.734 558.946, 219.405 558.985 C 216.841 559.003, 214.387 556.426, 213.470 552.750 C 212.523 548.956, 210 549.164, 210 553.035 C 210 562.730, 222.865 566.224, 227.462 557.778 L 229.423 554.173 227.114 546.182 C 224.406 536.809, 224.845 533.729, 228.822 534.192 C 230.524 534.390, 232.194 535.650, 233.486 537.711 C 237.073 543.432, 239.649 541.089, 236.490 534.980 C 234.091 530.342, 230.285 529.008, 225.235 531.037 M 468.332 533.487 C 459.970 537.710, 459.975 537.444, 468.044 549.930 L 475.206 561.012 479.223 558.756 C 487.905 553.880, 490.715 547.105, 487.091 539.783 C 482.954 531.425, 476.623 529.300, 468.332 533.487 M 262.655 551.739 C 259.570 557.787, 251.988 579.383, 252.720 580.035 C 253.799 580.998, 267.261 586, 268.771 586 C 269.447 586, 270 585.380, 270 584.622 C 270 583.853, 267.338 582.248, 263.979 580.992 C 260.667 579.754, 257.700 578.324, 257.385 577.814 C 257.071 577.305, 257.791 574.478, 258.987 571.531 L 261.162 566.174 268.250 568.585 C 272.148 569.911, 275.551 570.783, 275.811 570.522 C 276.840 569.493, 273.600 567.025, 268.378 564.861 C 262.502 562.425, 262.436 562.244, 264.982 555.548 L 265.947 553.008 270.724 554.861 C 278.237 557.775, 281 558.257, 281 556.656 C 281 555.281, 271.975 550.806, 266.781 549.606 C 264.509 549.081, 263.832 549.430, 262.655 551.739 M 430.730 549.603 C 429.996 550.337, 434.480 562.631, 439.420 573.426 C 442.202 579.505, 443.321 581.079, 444.224 580.176 C 445.127 579.273, 444.398 576.527, 441.097 568.393 C 433.187 548.899, 432.564 547.770, 430.730 549.603 M 398.500 560.501 C 397.950 560.689, 395.475 561.116, 393 561.451 C 385.151 562.511, 385.269 561.884, 389.542 579.918 C 391.815 589.509, 393.797 595.895, 394.432 595.675 C 395.627 595.261, 395.652 592.879, 394.543 585.423 L 393.788 580.345 399.886 578.122 C 406.542 575.695, 408 573.978, 408 568.566 C 408 565.167, 405.291 561, 403.082 561 C 402.577 561, 401.564 560.811, 400.832 560.579 C 400.099 560.348, 399.050 560.312, 398.500 560.501 M 301.385 562.186 C 300.717 563.267, 302.676 564.958, 304.628 564.985 C 308.028 565.031, 307.930 567.385, 303.463 592.835 C 302.970 595.640, 303.155 596.117, 304.626 595.833 C 306.038 595.562, 306.870 592.795, 308.938 581.498 L 311.500 567.500 315.250 567.190 C 320.752 566.734, 319.933 564.527, 313.749 563.143 C 305.642 561.329, 302.085 561.054, 301.385 562.186 M 391.750 564.689 C 390.757 564.949, 390.002 566.088, 390.006 567.323 C 390.011 569.483, 391.844 577, 392.366 577 C 392.515 577, 394.961 576.310, 397.801 575.466 C 403.996 573.627, 405.741 571.203, 403.962 566.909 C 402.865 564.260, 402.344 564.010, 398.129 564.116 C 395.583 564.180, 392.712 564.438, 391.750 564.689 M 343.260 566.766 C 342.654 568.345, 343.921 598.063, 344.644 599.234 C 345.843 601.174, 363 599.465, 363 597.406 C 363 596.449, 360.861 596.004, 355.250 595.792 L 347.500 595.500 347.500 589.500 L 347.500 583.500 355 583 C 360.778 582.615, 362.500 582.156, 362.500 581 C 362.500 579.928, 361.359 579.481, 358.500 579.433 C 356.300 579.397, 352.813 579.284, 350.750 579.183 L 347 579 347 574 L 347 569 354.500 569 C 360.987 569, 362 568.763, 362 567.244 C 362 565.701, 360.892 565.481, 352.896 565.434 C 346.021 565.393, 343.661 565.720, 343.260 566.766" stroke="none" fill="#f4f3f3" fill-rule="evenodd"/></svg>
                    <strong>S.E.T.E.P.I.D. | Fondo de Ahorro</strong>
                </div>
            </div>
            <UIAppMenu />
        </nav>
    </header>
    <div className="columns" style={{marginTop: '52px'}}>
        <UIAppLayout />
    </div>
    </>
  );
}

export default App;
