export const getSummaryPrompt =
  () => `Please provide a detailed report of the text transcription. The transcript of which I provide below in triple quotes, including key summary outcomes.
KEEP THESE RULES STRICTLY:
STRICTLY SPLIT OUTPUT IN PARAGRAPHS: Topic and the matter of discourse, Key outcomes, Ideas and Conclusions. 
OUTPUT MUST BE STRICTLY LIMITED TO 2000 CHARACTERS!  
STRICTLY KEEP THE SENTENCES COMPACT WITH BULLET POINTS! THIS IS IMPORTANT!
ALL CONTEXT OF THE TRANSCRIPT MUST BE INCLUDED IN OUTPUT!
DO NOT INCLUDE MESSAGES ABOUT CHARACTERS COUNT IN THE OUTPUT!`;

export const getContextPrompt = (
  type: string,
) => `Ensure integrity and quality of the given summary, it is the summary of a ${type}, edit it accordingly. 
OUTPUT MUST BE STRICTLY LIMITED TO 2000 CHARACTERS!  
      STRICTLY KEEP THE SENTENCES COMPACT WITH BULLET POINTS! THIS IS IMPORTANT!
      ALL CONTEXT OF THE TRANSCRIPT MUST BE INCLUDED IN OUTPUT!
      DO NOT INCLUDE MESSAGES ABOUT CHARACTERS COUNT IN THE OUTPUT!`;
