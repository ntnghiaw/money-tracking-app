// loginApi.js
const users = [
    { id: 1, 
      username: 'user1', 
      password: 'password1',
      name:'Phan Hoàng Phúc',
      date:'05/09/2002',
      gender:'Nam',
      phone:'0399915548',
      email:'phuc.phanphuc2002@hcmut.edu.vn',
      avatar:'https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg',
    },
    { id: 2, 
      username: 'user2', 
      password: 'password2',
      name:'Trần Phúc Anh',
      date:'02/06/2002',
      gender:'Nam',
      phone:'0933489677',
      email:'anh.tran0206@hcmut.edu.vn',
      avatar:'https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg',
    },
    { id: 3, 
      username: 'user3', 
      password: 'password3',
      name:'Nguyễn Trung Nghĩa',
      date:'01/01/2002',
      gender:'Nam',
      phone:'0399915548',
      email:'nguyentrungnghia@gmail.com',
      avatar:'https://www.lovethispic.com/uploaded_images/409526-Half-Moon-Good-Night-Gif.gif',
    },
    { id: 4, 
      username: 'user4', 
      password: 'password4',
      name:'Nguyễn Thị A',
      date:'01/01/2002',
      gender:'Nữ',
      phone:'0999999999',
      email:'nguyenthia@gmail.com',
      avatar:'https://www.lovethispic.com/uploaded_images/431671-Colorful-Flashing-Merry-Christmas-Gif.gif',
    },
    { id: 5, 
      username: 'ntnghiaw@gmail.com', 
      password: 'TrungNghia0!',
      name:'Nguyễn Trung Nghĩa',
      date:'26/04/2002',
      gender:'Nam',
      phone:'0384042202',
      email:'ntnghiaw@gmail.com',
      avatar:'https://www.lovethispic.com/uploaded_images/431671-Colorful-Flashing-Merry-Christmas-Gif.gif',
    },
    
  ];
  
  export const loginApi = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('Invalid username or password'));
      }
    });
  };