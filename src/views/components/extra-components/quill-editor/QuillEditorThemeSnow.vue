<!-- =========================================================================================
    File Name: QuillEditorThemeSnow.vue
    Description: Quill editor with snow theme
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Wilber Galindez
    Author URL: https://www.wilber.dev/
========================================================================================== -->


<template>
    <vx-card title="Theme Snow" code-toggler>
        <p class="mb-5">Snow is a clean, flat toolbar theme</p>
        <quill-editor v-model="content"></quill-editor>

        <prism class="rounded-lg"> {{ content }} </prism>

        <template slot="codeContainer">
&lt;template&gt;
  &lt;quill-editor v-model=&quot;content&quot;&gt;&lt;/quill-editor&gt;
&lt;/template&gt;

&lt;script&gt;
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      content: `...`,
    }
  },
  components: {
    quillEditor,
  }
}
&lt;/script&gt;
        </template>

    </vx-card>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import Prism from 'vue-prism-component'

export default {
  data () {
    return {
      content: `
<h2><span class="ql-font-serif">Quill Rich Text Editor</span></h2><br />
<p>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.</p><br />
<iframe class="ql-video ql-align-center" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" width="560" height="238"></iframe>
            `
    }
  },
  components: {
    quillEditor,
    Prism
  }
}
</script>
