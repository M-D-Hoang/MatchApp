
import React, { useCallback, useEffect, useState } from "react";
import { itemCategories } from "../categories";
export function ItemExclusiveSearch({t, updateSectionQuery}){

    const [category, setCategory] = useState('');
    const [extra, setExtra] = useState('');

    const sendUpdatedDataUp = useCallback(() => {
        let queryString = category !== '' ? `category=${category}` : "";
        queryString += extra !== '' ? `&extraField=${extra}` : "";
        updateSectionQuery(queryString);
    }, [category, extra, updateSectionQuery]);
    
    useEffect(() => {
        sendUpdatedDataUp();
    }, [extra, category, sendUpdatedDataUp]); // Trigger useEffect whenever 'extra' changes


    const categoryOptionJSX = itemCategories.map(cat=>{
        return(<option key={cat} value={cat}>{t(`category.${cat}`)}</option>)
    })


    return (
        <>
            
            <select
                className="item-type-select"

                onChange={(e) => { setCategory(e.target.value); sendUpdatedDataUp() }}>
                <option value="">{t("form.category")}</option>
                {categoryOptionJSX}

            </select>

            
            <input
                name='extra'
                value={extra}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setExtra(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.extra")}
            ></input>
        </>
    );
}