import { useEffect,  useCallback, useState  } from "react";
export function CarExclusiveSearch({t, updateSectionQuery}){
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [mileage, setMileage] = useState('');
    const [transmission, setTransmission] = useState('');
    const [driveTrain, setDriveTrain] = useState('');
    


    const sendUpdatedDataUp = useCallback(() => {
        let queryString = make !== '' ? `make=${make}` : "";
        queryString += model !== '' ? `&model=${model}` : "";
        queryString += model !== '' ? `&bodyType=${bodyType}` : "";
        //queryString += model !== '' ? `&mol=${mileage}` : "";
        queryString += model !== '' ? `&transmission=${transmission}` : "";
        queryString += model !== '' ? `&driveTrain=${driveTrain}` : "";
        updateSectionQuery(queryString);
    }, [bodyType, driveTrain, make, model, transmission, updateSectionQuery]);
    
    useEffect(() => {
        sendUpdatedDataUp();
    }, [make, model, bodyType, mileage, transmission, driveTrain, sendUpdatedDataUp]);



    return(
        <>

            <input
                name='make'
                value={make}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setMake(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.make")}
            ></input>
            <input
                name='model'
                value={model}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setModel(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.model")}
            ></input>
            <input
                name='bodyType'
                value={bodyType}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setBodyType(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.bodyType")}
            ></input>
            <input
                name='bodyType'
                value={mileage}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setMileage(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.mileage")}
            ></input>
            <input
                name='transmission'
                value={transmission}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setTransmission(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.transmission")}
            ></input>
            <input
                name='driveTrain'
                value={driveTrain}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setDriveTrain(newValue);
                    sendUpdatedDataUp(newValue);
                   
                }}
                className="item-type-select"
                type='text'
                placeholder={t("form.driveTrain")}
            ></input>
        </>
    );
}