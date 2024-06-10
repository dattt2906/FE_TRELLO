
import './App.css';
import Header from './component/header/header';
import Sidebar from './component/container/sidebar/sidebar';
import Navbar from './component/container/navbar/navbar';
import Container from './component/container/container';
import Login from './component/login/login';
import { SocketProvider } from './socket/socketProvider';
import { Editor } from '@tinymce/tinymce-react';



function App() {
  return (
    <div className="trello">
      
    <Header></Header>
    <Container></Container>
{/*    
    <Editor
  apiKey='2xnxvpjsqaccjqcj37gsbphq5js2lr168nv2s1hhntvg62rl'
  init={{
    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | uploadimage', // Thêm 'uploadimage' vào thanh công cụ
    images_upload_url: '/upload_image_handler', // Đường dẫn URL cho xử lý tải lên hình ảnh
    images_upload_handler: function (blobInfo, success, failure) {
      // Xử lý tải lên hình ảnh tại đây
      // Tham khảo: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
    },
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
  }}
  initialValue="Welcome to TinyMCE!"
/> */}
    
    </div>

    
    
  );
}

export default App;
