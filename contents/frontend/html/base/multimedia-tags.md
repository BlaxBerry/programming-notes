# HTML 多媒体标签

## 音频标签

### \<audio>

<div :class="$style.playground">
  <audio controls :src="sampleAudioURL"></audio>
</div>

```html{0}
<audio
  controls
  src="https://music.wixstatic.com/mp3/b29e13_10fe0bcdbd5f406290b1dcfe1dbf291b.mp3"
></audio>
```

## 视频标签

### \<video>

<video controls src="" width="100%"></video>

```html{0}
<video
  controls
  src=""
  width="100%"
></video>
```

## 嵌入标签

### \<iframe>

<iframe width="100%" height="629" src="https://www.youtube.com/embed/G7KNmW9a75Y?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj" title="Miley Cyrus - Flowers (Official Video)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

```html
<iframe
  width="100%"
  height="629"
  src="https://www.youtube.com/embed/G7KNmW9a75Y?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj"
  title="Miley Cyrus - Flowers (Official Video)"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>
```

<!-- 本文中用到的逻辑 -->
<script setup>
import { ref } from 'vue'

const sampleAudioURL= ref("https://music.wixstatic.com/mp3/b29e13_10fe0bcdbd5f406290b1dcfe1dbf291b.mp3")
</script>

<!-- 本文中用到的样式 -->
<style module>
.playground {
    background-color: #f5f5f5;
    color: black;
    padding: 1rem;
    border: 1px solid grey;
    margin-top: 16px;
}
.comment {
    display: block;
    color: green;
}
</style>
