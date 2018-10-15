## Wesbos's [CSS Grids](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) Course Takeaways

### Fundamentals

Creating a grid container

`display: grid`

```
.container {
  display: grid;
}
```

Setting grid container by columns

[grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)

```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
}
```

> Optionally, `grid-template-columns` also accepts values in `rems/ems`, `auto` or something called `fr` (insert link here)

Setting grid by rows

[grid-template-rows](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)

```
.container {
  display: grid;
  grid-template-rows: 100px 100px;
}
```

> Similar to `grid-template-columns`, the values accepted are the same just that it reflects the height instead

Creating a gap between items

[grid-gap](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)

```
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px; // or grid-template-rows
  grid-gap: 8px;
}
```

Line Meanings in Firefox Dev Tools

![Line Meanings](assets/line-meanings.png)