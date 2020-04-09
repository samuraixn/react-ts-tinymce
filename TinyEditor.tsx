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

            // editor.on('PreProcess', function(obj) {
            //   //console.log('PRE - Obj: ', obj);
            // });

            // editor.on('PostProcess', function(obj) {
            //   //console.log('POST - Obj: ', obj);
            // });
            // editor.on('Change', function(c) {
            //   //console.log('Change: ', c);
            //   // var content = editor.getContent();;
            //   // editor.setContent(content);
            // let content = editor.seleciton.getContent();
            // editor.selection.setContent('<span class="hightligh">' + content + '</span>');  
            // });

            // editor.on('NodeChange', function(nc) {
            //   //console.log('NC::: ', nc);
            // });

            editor.on('BeforeSetContent', function(bsc) {
              console.log('BSC: ', bsc);
            });          

          editor.on('keydown', function (e) {
            const isBackspace = e.code === "Backspace";
            const isTextSelected = editor.selection.getContent() !== "";
            
            if (isBackspace && isTextSelected) {
              editor.selection.setNode(editor.dom.create('del', {}, editor.selection.getContent()));
              e.preventDefault();
            } else if (isBackspace && !isTextSelected) {
              const rng = editor.dom.createRng();
              const currentSel = editor.selection.getRng();
              rng.setStart(currentSel.startContainer, currentSel.startOffset - 1);
              rng.setEnd(currentSel.endContainer, currentSel.endOffset);
              editor.selection.setRng(rng);
              editor.selection.setNode(editor.dom.create('del', {}, editor.selection.getContent()));
              editor.selection.setCursorLocation(currentSel.startContainer, currentSel.startOffset);
              e.preventDefault();
            } else {
              // Code for highlight new text
              
            }
          });
          }
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyEditor;