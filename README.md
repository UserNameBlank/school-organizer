# School Organizer

A Web/Mobile App for managing school activities,
made using [SvelteKit](https://kit.svelte.dev/) and [CapacitorJS](https://capacitorjs.com/).

You can try the web demo [here](https://UserNameBlank.github.io/school-organizer).

## Building

Alternatively, you can get the app through the [last release](https://github.com/UserNameBlank/school-organizer/releases/latest).

### Android

Using [bun](https://bun.sh/) and [Android Studio](https://developer.android.com/studio):

```sh
# clone the repository
git clone https://github.com/UserNameBlank/school-organizer.git
cd school-organizer

# install dependencies
bun install

# build the app (using bun)
bun run build
bunx cap sync
bunx cap open android # opens up android studio

# build the app inside android studio
```

### iOS

not (yet)

## Special Thanks & Acknowledgements

Base:

- [SvelteKit](https://kit.svelte.dev/)
- [CapacitorJS](https://capacitorjs.com/)

UI:

- [shadcn/ui](https://ui.shadcn.com/)
- [shadcn-svelte](https://shadcn-svelte.com/)
- [tailwindcss](https://tailwindcss.com/)

## Licence

MIT License

Copyright (c) 2024 UserNameBlank

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
