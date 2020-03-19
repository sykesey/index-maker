
//includes
const fs = require('fs');

//get command line options ( --input=x.txt [--verbose] )
const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'input', type: String }
]

const commandLineArgs = require('command-line-args')
const options = commandLineArgs(optionDefinitions)

if (fs.existsSync(options.input) == false)
{
   throw "Input file " + options.input + "not found or not provided" 

}

let contents = fs.readFileSync(options.input,"ascii");

let lines = contents.toString().split(/\r?\n/);
let keywords = {};

//go over each line
for (var i = 0; i < lines.length; i++)
{
   let currentLine = lines[i].toLowerCase();
   //don't bother with  lines that only contain blank spaces
   if (currentLine.match(/^ +$/))
     continue;

   //explode into keywords by space
   let lineKeywords = currentLine.split(/ +/);

   //go into each keyword and collate into keyword buckets
   for (var j = 0; j < lineKeywords.length; j++)
   {
      let currentKeyword = lineKeywords[j];
      //don't bother with empty keywords
      if (currentKeyword.match(/^ +$/) || currentKeyword == "")
        continue;
      //now put them into buckets and increase the count if already found
      if ( keywords.hasOwnProperty(currentKeyword) )
         keywords [ currentKeyword ] += 1
      else
	       keywords [ currentKeyword ] = 1
   }
}
//now sort them all in reverse order before we print them out
let keywordsSorted = Object.keys(keywords).sort(function(a,b){return keywords[b]-keywords[a]})

//print them all out now using forEach on the array
keywordsSorted.forEach( i => process.stdout.write( i + " " + keywords[i] + "\n" ) );
