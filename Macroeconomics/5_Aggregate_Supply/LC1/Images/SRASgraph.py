
# coding: utf-8

# ###Generic Plotting

# In[10]:

import sys
import re
sys.path.append('../../../Python')

import templateGenerator
reload(templateGenerator)
tGen = templateGenerator.templateGenerator(course_id='DavidsonCollege/DAP002/3T2014',
                                           Title='Generic Plotting',
                                           MacroJS='../JS/MacroAllBoards.js',
                                           JS='SRASgraph.js',
                                           OutputFile='SRASgraph.html',
                                           studioPaths=False 
                                          )


# ### HTML Interactive Cell

# In[13]:

get_ipython().run_cell_magic(u'HTML', u'', u'<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset="UTF-8">\n        <title></title>\n        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.98/jsxgraphcore.js"></script>\n    </head>\n\n    <body>\n        <div style="width: 100%; overflow: hidden;">\n            <div id=\'jxgbox1\' class=\'jxgbox\' style=\'width:500px; height:450px; float:left;\'></div>        \n        </div>\n        \n        <!--START-BUTTON FOR PASS STATE-->\n        <div id=\'StateGrab\' style=\'width:350px; float:left;\'>        \n            <input class="btn" type="button" value="Get State" onClick="getNotebookState()">\n            <div id="spaceBelow">State:</div>\n        </div>\n        <script type="text/javascript">\n            getNotebookState = function(){\n                state = getGrade();\n                statestr = JSON.stringify(state);\n\n                document.getElementById(\'spaceBelow\').innerHTML += \'<br>\'+statestr;\n                var command = "state = " + statestr;\n                console.log(command);\n\n                //Kernel\n                var kernel = IPython.notebook.kernel;\n                kernel.execute(command);\n\n                return statestr;\n            }\n        </script>\n        <!--END-BUTTON FOR PASS STATE-->\n        \n        <script type="text/javascript" src="../../../JS/jschannel.js"></script>\n        <script type="text/javascript" src="../../../JS/edxintegration.js"></script>\n        <script type="text/javascript" src="../../../JS/params1Board.js"></script>\n        <script type="text/javascript" src="../../../JS/MacroAllBoards.js"></script>\n        <script type="text/javascript" src="SRASgraph.js"></script>\n    </body>\n</html>')


# ### Generate HTML File

# In[7]:

# reload(templateGenerator)
inputCell = eval('_i%d' % tGen.findIPythonHTMLCell(_ih))
htmlFile = tGen.scrapeHTMLfromIPython(inputCell)
tGen.writeOutputFile(htmlFile)


# In[ ]:


