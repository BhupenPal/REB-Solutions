const countryCity = [

    { 
   country : "India",
    cities : [
        "Pune",
        "Tamil Nadu",
        "Delhi",
        "Bengaluru",
        "Gurgaon",
        "Noida",
        "Calcutta",
        "Hyderbad",
        "Madhya Pradesh"
    ]},
    { 
        country : "Malaysia",
         cities : [
             "XYZ",
             "Tamil",
             "DelhiOne",
             "Bengaloreye",
             "Gurgaonaqaa",
             "Noidaffh",
             "Calcuttaertg",
             "Hyderbadighn",
             "Madhya Pradeshihnm"
         ]}




]

const setCities= (SelectBox) => {
    const cityBox=document.getElementById('city-trigger')
    cityBox.innerHTML= ''
      
    const cities= countryCity.reduce((result , obj) => {
        if(obj.country === SelectBox.value){
            result=obj.cities
        }
        return result
    }, null)

    for(let i=0;i<cities.length ; i++)
    {
        let opt=document.createElement('option')
        opt.value = cities[i]
        opt.innerHTML=cities[i]
        cityBox.appendChild(opt)
    }
}