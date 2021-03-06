const xlsx = require("xlsx");

//school level underlying data
const school_level_underlying_data_wb = xlsx.readFile("sen_school_level_underlying_data.xlsx");
const school_level_underlying_data_ws =school_level_underlying_data_wb.Sheets["sen_school_level_underlying_dat"];
const school_level_underlying_data_jsonData = xlsx.utils.sheet_to_json(school_level_underlying_data_ws);

const school_level_localAuthority_names = [...new Set(school_level_underlying_data_jsonData.map((record) => record.la_name)),];

let local_authority_level_JSON = [];

school_level_localAuthority_names.forEach((name) => {

  let newObject = {};
  let schoolCount = 0;
  let sen_or_rp_Count = 0;
  let total_pupils = 0;
  let EHC_plan = 0;

  school_level_underlying_data_jsonData.forEach((record) => {

    if (record.la_name === name) {
      schoolCount++;
      record.SEN_Unit === 1 || record.RP_Unit === 1 ? sen_or_rp_Count++ : 0;
      total_pupils += record["Total pupils"];
      EHC_plan += record["EHC plan"];
    }

  });

  newObject["Local_authority"] = name;
  newObject["Total_schools"] = schoolCount;
  newObject["SEN_or_RP_units"] = sen_or_rp_Count;
  newObject["Total_pupils"] = total_pupils;
  newObject["EHC_plan"] = EHC_plan;
  local_authority_level_JSON.push(newObject);

});


//independant special schools data
const independant_special_schools_wb = xlsx.readFile("IndSpec_not_s41.xlsx");
const independant_special_schools_ws = independant_special_schools_wb.Sheets["Sheet"];
const independant_special_schools_jsonData = xlsx.utils.sheet_to_json(independant_special_schools_ws);

const independant_special_schools_localAuthority_names = [...new Set(independant_special_schools_jsonData.map((record) => record['Local Authority'])),];

let total_independant_localAuthority_names_Json = []

independant_special_schools_localAuthority_names.forEach((name)=>{
  let newObject = {};
  let schoolCount = 0

  independant_special_schools_jsonData.forEach((record) => { record['Local Authority'] === name ? schoolCount++ : 0; });

  newObject["Local_authority"] = name;
  newObject["Total_schools"] = schoolCount;
  total_independant_localAuthority_names_Json.push(newObject)

})

//adding independant total schools to main table
local_authority_level_JSON.forEach((mainRecord)=>{
  
  total_independant_localAuthority_names_Json.forEach((independantRecord)=>{

    if(mainRecord['Local_authority'] === independantRecord['Local_authority']){
      mainRecord["Total_schools"] += independantRecord["Total_schools"]
    }

  })

})

//approved special schools data
const approved_and_removed_special_schools_wb = xlsx.readFile("Approved_S41_Full_List_Mar_2022.xlsx");
const approved_and_removed_special_schools_ws = approved_and_removed_special_schools_wb.Sheets["S41"];
const approved_and_removed_special_schools_jsonData = xlsx.utils.sheet_to_json(approved_and_removed_special_schools_ws);

let approved_and_removed_special_schools_localAuthority_names = approved_and_removed_special_schools_jsonData.map(record => record['Local authority']||'');
approved_and_removed_special_schools_localAuthority_names = [... new Set(approved_and_removed_special_schools_localAuthority_names.map(val=>val.trim()))]
//used trim to get rid of white space at the end of some local authority names 

let total_approved_and_removed_localAuthority_names_Json = []

approved_and_removed_special_schools_localAuthority_names.forEach((name)=>{
  let newObject = {};
  let schoolCount = 0

  approved_and_removed_special_schools_jsonData.forEach((record) => { record['Local Authority'] === name ? schoolCount++ : 0; });

  newObject["Local_authority"] = name;
  newObject["Total_schools"] = schoolCount;
  total_approved_and_removed_localAuthority_names_Json.push(newObject)

})


//adding approved and removed total schools to main table
local_authority_level_JSON.forEach((mainRecord)=>{
  
    total_approved_and_removed_localAuthority_names_Json.forEach((Record)=>{
  
      if(mainRecord['Local_authority'] === Record['Local_authority']){
        mainRecord["Total_schools"] += Record["Total_schools"]
      }
  
    })
    
  })

const local_authority_level_workBook = xlsx.utils.book_new()
const local_authority_level_workSheet = xlsx.utils.json_to_sheet(local_authority_level_JSON)
xlsx.utils.book_append_sheet( local_authority_level_workBook,local_authority_level_workSheet,'local_authority_level_Data')

xlsx.writeFile(local_authority_level_workBook,'local_authority_level_Data File.xlsx')
