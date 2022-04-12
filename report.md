# Handling of irregular data

## Problems with data from 'Special schools and colleges approved under section 41 in England and Wales' excel sheet
### White spaces in text
Some Local authority names from this data file had some white space at the end so they were not being removed in the process of removing duplicate names.
To solve this I used the trim method on each local authority name so It would filtered/remove the duplicate names. 
I removed the duplicate local authority names so that I can create an object for each local authority to make a local authority level spreasheet.

### Extraction of data
There were some cases where I have some extra Local authority names which don't exist in the excel sheet it self which may have to do something with logic
I'm using so feedback on that would be helpful.  

### Data from JSON not in correct format 
```js 
{
    'Please note that readers of the list should not rely on this list  as a verification of the financial health of the Independent special schools and Special post 16 institutions listed. For the purposes of the list Financial health 
is only assessed at application.': '861/6004',
    __EMPTY: 'Stoke-on-Trent',
    __EMPTY_1: 'Hillcrest Glebedale School',
    __EMPTY_2: 'Hillcrest Childrens Services (2) Ltd',
    __EMPTY_3: 'Independent special school',
    __EMPTY_4: 41974
  }
  ```
 
 As you can see in the above code the keys would come out as `__EMPTY` so access these values and keeping track of the would be difficult.
 However after removing the text in the excel sheet it self sitting at the top of the sheet this problem stopped occuring and gave me the right key names
 like in the example below.
 
 ```js
 {
    'Getting Information about Schools reference': '861/6004',
    'Local authority': 'Stoke-on-Trent',
    'Institution trading name (1)': 'Hillcrest Glebedale School',
    'Legal name (2)': 'Hillcrest Childrens Services (2) Ltd',
    'Independent special school / Special post-16 institution': 'Independent special school',
    'Date approved under section 41 \r\n': 41974
  }
  ```
  ### Final thoughts
  I'm pretty sure I've probably missed a few issues that I should've handled so any feedback would be great!
  
