## Wesbos's [CSS Grids](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) Course Takeaways

### Fundamentals

Creating a grid container

`display: grid`

```scss
.container {
  display: grid;
}
```

Setting grid container by columns

[grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)

```scss
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
}
```

> Optionally, `grid-template-columns` also accepts values in `rems/ems`, `auto` or something called `fr` (insert link here)

Setting grid by rows

[grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)

```scss
.container {
  display: grid;
  grid-template-rows: 100px 100px;
}
```

> Similar to `grid-template-columns`, the values accepted are the same just that it reflects the height instead

> Extra: What if there are more rows than I explicitly set? Use `grid-auto-rows`

[grid-auto-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows)

```scss
.container {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 100px 100px;
  grid-template-rows: 50px 50px;
  grid-auto-rows: 100px; // Defines all implicit rows to have height of 100px
}
```

Creating a gap between items

[grid-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

```scss
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px; // or grid-template-rows
  grid-gap: 8px;
}
```

Line Meanings in Firefox Dev Tools

![Line Meanings](assets/line-meanings.png)