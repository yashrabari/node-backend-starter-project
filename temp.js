var addresses = [
    {
        "id": 2,
        "attributes": {
            "address1": "C-45/532, Shree Nath Apartment",
            "address2": "B/h Vyaswadi, Nava Wadaj",
            "city": "AHmedabad",
            "state": "Gujarat",
            "zipcode": "380013",
            "country": "india",
            "isDefault": true,
            "typeOfAddress": "shipping",
            "createdAt": "2022-10-10T04:31:55.202Z",
            "updatedAt": "2022-10-10T04:31:55.202Z",
            "publishedAt": "2022-10-10T04:31:55.196Z"
        }
    },
    {
        "id": 3,
        "attributes": {
            "address1": "C-45/532, Shree Nath Apartment",
            "address2": "B/h Vyaswadi, Nava Wadaj",
            "city": "AHmedabad",
            "state": "Gujarat",
            "zipcode": "380013",
            "country": "india",
            "isDefault": false,
            "typeOfAddress": "shipping",
            "createdAt": "2022-10-10T04:40:01.278Z",
            "updatedAt": "2022-10-10T04:56:07.868Z",
            "publishedAt": "2022-10-10T04:40:01.272Z"
        }
    }
]
var newEntry = {
    "address1": "C-45/532, Shree Nath Apartment",
    "address2": "B/h Vyaswadi, Nava Wadaj",
    "city": "AHmedabad",
    "state": "Gujarat",
    "zipcode": "380013",
    "country": "india",
    "isDefault": true,
    "typeOfAddress": "shipping",
    "createdAt": "2022-10-10T04:31:55.202Z",
    "updatedAt": "2022-10-10T04:31:55.202Z",
    "publishedAt": "2022-10-10T04:31:55.196Z"
}


const isDuplicate = (array, newEntry) => {
    var adLine1 = !!array.filter(el => el.attributes.address1 == newEntry.address1).length
    var adLine2 = !!array.filter(el => el.attributes.address2 == newEntry.address2).length
    var city = !!array.filter(el => el.attributes.city == newEntry.city).length
    var state = !!array.filter(el => el.attributes.state == newEntry.state).length
    var zipcode = !!array.filter(el => el.attributes.zipcode == newEntry.zipcode).length
    var country = !!array.filter(el => el.attributes.country == newEntry.country).length
    var toa = !!array.filter(el => el.attributes.typeOfAddress == newEntry.typeOfAddress).length
    if (adLine1 && adLine2 && city && state && zipcode && country && toa) {
        return true
    }
    return false
}

console.log(isDuplicate(addresses, newEntry))