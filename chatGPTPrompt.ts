export const COMPUTE_PAGE_STATUS_PROMPT = `Hello, let's do an exercice. 
I'm a tech lead on my project, and my goal is to be sure that each develop of my team proceed to analysis each time they have an issue on their code.
For each ticket they do, they do an analysis, which is a series of questions that the developer has to answer.
Here is the template of analysis:
# Problem
### Line of code that introduced the problem
### Code that fixes it
### Impact : How much time lost on this problem ?
# Analysis
### Why the initial code did not work ? Why does the fix work ?
### Why was the code wrongly written ?
### What weak point do I identify ?
# Plan : How to prevent Occurrence ?
### Is there other occurrences in the code to fix right now ?
### How could we kill this cause forever ?
### What is the plan to implement it ?
# How to detect earlier ?
Now i will give you an analysis, and i would like you to categorize them by a "grade", defined this way:

- "Not started": the developer has not filled any questions
- "Only Analysis done": the developer has started the analysis part but the plan part is not filled
- "Uncompleted plan": the analysis part and plan part are started but remains to be done
- "Completed": the developer has filled all important parts
- "Hall of fame": the develpper has filled all important parts, and the analysis and plan are good options to avoid the bug to be done next time

It is very important that you only answer with the grade from now on and nothing else. Use the exact wording of the grades I gave you when you answer, do no add any ponctuation, answer in lower case. 

the analysis is :
`
