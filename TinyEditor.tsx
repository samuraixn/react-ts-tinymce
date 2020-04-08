
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TinyEditor extends React.Component {
  handleEditorChange = (e) => {
    console.log(
      'Content was updated:',
      e.target.getContent()
    );
  }

  render() {
    return (
      <Editor
        apiKey="5de7vcmanfbbkody47j7fmjkusy5t4rv632z50mj965ld00l"
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help',
          setup: function(editor) {
            editor.on('init', function(e) {
              console.log('The Editor has initialized.');
            });
          },
          init_instance_callback: function(editor) {
            editor.on('TextColorChange', function(e) {
              console.log('The text color of ' + e.name + ' is now:' + e.color);
            });
          }
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyEditor;