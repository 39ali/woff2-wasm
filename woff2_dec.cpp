/* Copyright 2013 Google Inc. All Rights Reserved.

   Distributed under MIT license.
   See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
*/

#include <string>

#include "woff2/src/file.h"
#include <woff2/decode.h>
#include <vector>
#include <emscripten.h>
#include <emscripten/bind.h>
//#include <emscripten/val.h>
using namespace emscripten;

using std::string;

std::vector<unsigned char> woff2_dec(string woff2buf, size_t bufSize)
{

    string input = woff2buf;

    const uint8_t *raw_input = reinterpret_cast<const uint8_t *>(input.data());
    string output(std::min(woff2::ComputeWOFF2FinalSize(raw_input, input.size()),
                           woff2::kDefaultMaxSize),
                  0);
    woff2::WOFF2StringOut out(&output);

    const bool ok = woff2::ConvertWOFF2ToTTF(raw_input, input.size(), &out);

    if (!ok)
    {
        printf("somthing went wrong!\n");
    }
    const std::vector<uint8_t> charvect(output.begin(), output.begin() + out.Size());
  
    return charvect;
}

EMSCRIPTEN_BINDINGS(woff_2)
{
    register_vector<uint8_t>("vector<uint8_t>");
    function("woff2_dec", &woff2_dec);
}
