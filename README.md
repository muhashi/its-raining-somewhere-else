# it's raining somewhere else
> it's always raining somewhere...

A webapp that shows you where in the world it is currently raining

![image](https://github.com/muhashi/its-raining-somewhere-else/assets/105213357/2f7c2292-19c5-4343-9a5b-66c89a4290a6)

## Build Instructions

### Frontend

1. React + Vite source code is stored in the `/client` folder.
2. Run `npm run dev` to start, `npm run build` to build.
3. Github Workflow automatically deploys it to your own Github Pages. Replace the line in the workflow `run: echo "itsrainingsomewhereelse.com" > dist/CNAME` with your own custom domain, or remove the line to default to your .github.io domain.
4. Replace `VITE_PROD_API_URL` with your server's url.

### Backend
1. Express server source code is stored in the `/server` folder.
2. Run `npm run dev` to start.
3. Replace the `CLIENT_URL` in the `.env` file with your own website for CORS.


## Acknowledgements

The website is named after [the music by toby fox](https://www.youtube.com/watch?v=YidmA4DCjGc), which is also the music playing on the page.

The rain effect is adapted from this [Codepen by Aaron Rickle](https://codepen.io/arickle/details/XKjMZY), licensed under the MIT license:

```
Copyright (c) 2023 by Aaron Rickle (https://codepen.io/arickle/pen/XKjMZY)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
