import React from "react";
import CategoryBox from "@/Components/Common/CategoryBox";

const CategoryStyle = ({categoryIds,style,image,theme,title,sliderOptions,selectedCategoryId,classes}) => {
  return (
    <>
      <CategoryBox
        categoryIds={categoryIds}
        style={style}
        image={image}
        theme={theme}
        title={title}
        classes={classes}
        sliderOptions={sliderOptions}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};

export default CategoryStyle;
