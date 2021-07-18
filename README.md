<link rel="stylesheet" href="/public/yue.css">

# Styled Roam (Research)

Roam Research ✍️ Writing with your lovely cards 🧩 and beautiful theme 🎨

> My custom CSS and JavaScript extension for [Roam Research](https://roamresearch.com)

🆕 [#roam𐃏files](https://twitter.com/hashtag/roam%F0%90%83%8Ffiles?src=hashtag_click) Roam Research ✍️ [Files Attachment Dashboard](./ROAM_FILES.md) 🗃

## Quick Start

1. Add a `{{[[roam/js]]}}` block firstly
2. Add a **CHILD** block `/JavaScript Code Block` with this code...

```js
window.URLScriptServer = `https://styled-roam.vercel.app/`;

var existing = document.getElementById("styled-roam");
if (!existing) {
  var extension = document.createElement("script");
  extension.src = window.URLScriptServer + "js/index.js";
  extension.id = "styled-roam";
  extension.async = true;
  extension.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(extension);
}
```

3. Press the **BIG RED** button to enable the script

![image](https://user-images.githubusercontent.com/4997466/113826270-8965f500-97b4-11eb-983f-26e693f28e8b.png)

## Quick Review

![Roam Research 卡片式写作 Candy 主题](https://cdn.jsdelivr.net/gh/jimmylv/images@master/2020/09/Roam%20Research%20%E5%8D%A1%E7%89%87%E5%BC%8F%E5%86%99%E4%BD%9C%20Candy%20%E4%B8%BB%E9%A2%98.jpg)

![Roam Research Calendar View switch-0001](https://raw.staticdn.net/JimmyLv/images/master/2021/Roam%20Research%20switch-0001.jpg)

![Roam Research 卡片式主题 Focus 模式](https://raw.staticdn.net/JimmyLv/images/master/2020/Roam%20Research%20%E5%8D%A1%E7%89%87%E5%BC%8F%E4%B8%BB%E9%A2%98%20Focus%20%E6%A8%A1%E5%BC%8F.jpg)

Related Twitter:

- https://twitter.com/Jimmy_JingLv/status/1304451043594387456?s=20
- https://twitter.com/Jimmy_JingLv/status/1343897637255143424?s=20
- https://twitter.com/Jimmy_JingLv/status/1305893239187103749?s=20
- https://twitter.com/Jimmy_JingLv/status/1376741905485033476?s=20

## Basic Usage

配合 Candy 主题食用最佳，当然其他主题也好看，😉

```css
@import url("https://cdn.jsdelivr.net/gh/JimmyLv/Roam-Research-Themes@patch-1/Candy.css");
```

## References

- [Roamcult Themes](https://roamresearch.com/#/app/help/page/fJRcVITNY)
- [palashkaria/roam-modifiers: userscripts/custom CSS files for Roam Research](https://github.com/palashkaria/roam-modifiers)
- [roamhacker/roam42: Level up Roam with power user features. Automation, keyboard nav, dictionary, live preview and more.](https://github.com/roamhacker/roam42)
