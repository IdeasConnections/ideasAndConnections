import React from "react";
// import { AiOutlineClose} from 'react-icons/ai'

const SearchUsers = ({ setSearchInput }) => {
  return (
    <div>
      <div className='search-box'>
        <input
          type='text'
          placeholder='Search'
          style={{
            backgroundImage: `url(data:image/svg+xml;base64,${btoa(
              `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#CCCCCC"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.97-5-5.97-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 3 2.56 5.5 5.34 5.97a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`
            )})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            paddingLeft: "30px", // Adjust padding as needed
            color: "black",
          }}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {/* <AiOutlineClose onClick={()=> setSearchInput(false)} /> */}
      </div>
    </div>
  );
};

export default SearchUsers;
