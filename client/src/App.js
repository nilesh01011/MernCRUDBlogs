import { Navigate, Route, Routes } from 'react-router-dom';
import Posts from './Components/Posts/Posts';
import AddPosts from './Components/Posts/Post/AddPosts';
import EditPosts from './Components/Posts/Post/EditPosts';
import SinglePostsDetails from './Components/Posts/Post/SinglePostsDetails';
import PageNotFound from './Components/PageNotFound';
import Navbar from './Components/Header/Navbar';
import { AppBarStyles } from './AppBarStyles';
import { SearchPostData } from './HttpServices/Posts';
import { useState } from 'react';

function App() {
  const classes = AppBarStyles();

  const [searchPostData, setSearchPostData] = useState([]);

  const handleSearchOnChange = (target) => {
    SearchPostData({ data: target.value }).then(({ data: { posts } }) => {
      setSearchPostData(posts);
    });
  };

  return (
    <div className='App'>
      <Navbar
        searchPostData={searchPostData}
        handleSearchOnChange={handleSearchOnChange}
      />

      <div className={classes.main}>
        <Routes>
          <Route
            exact
            path='/'
            element={<Posts searchPostData={searchPostData} />}
          />
          <Route exact path='/posts' element={<Navigate replace to='/' />} />
          <Route path='/posts/add' element={<AddPosts />} />
          <Route path='/posts/edit/:id' element={<EditPosts />} />
          <Route path='/posts/:id' element={<SinglePostsDetails />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
