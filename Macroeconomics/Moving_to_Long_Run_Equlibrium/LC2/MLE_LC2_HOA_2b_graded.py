
# coding: utf-8

# ###Moving to Long-Run Equilibrium
# https://studio.edge.edx.org/container/i4x://DavidsonCollege/DAP002/vertical/ee567d7e52294aeaa8a32cd1c3f09cf3?action=new

# In[25]:

get_ipython().run_cell_magic(u'HTML', u'', u'<!DOCTYPE html>\n<html>\n    <head>\n        <meta charset="UTF-8">\n        <title>Moving Toward Long-Run Equilibrium</title>\n        <script type="text/javascript" src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML-full"></script>\n        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsxgraph/0.98/jsxgraphcore.js"></script>\n        <script type="text/javascript" src="underscore-min.js"></script>\n        <script type="text/javascript" src="jquery.min.js"></script>\n        <script type="text/javascript" src="jquery-ui.min.js"></script>\n        \n    </head>\n\n    <body>\n        <div style="width: 100%; overflow: hidden;">\n            <div id=\'jxgbox1\' class=\'jxgbox\' style=\'width:350px; height:300px; float:left; border: solid #1f628d 2px;\'></div>        \n        </div>\n        \n        <!--START-BUTTON FOR PASS STATE-->\n        <div id=\'StateGrab\' style=\'width:350px; float:left;\'>        \n            <input class="btn" type="button" value="Get State" onClick="getNotebookState()">\n            <div id="spaceBelow">State:</div>\n        </div>\n        <script type="text/javascript">\n            getNotebookState = function(){\n                state = getInput();\n                statestr = JSON.stringify(state);\n\n                document.getElementById(\'spaceBelow\').innerHTML += \'<br>\'+statestr;\n                var command = "state = " + statestr;\n                console.log(command);\n\n                //Kernel\n                var kernel = IPython.notebook.kernel;\n                kernel.execute(command);\n\n                return statestr;\n            }\n        </script>\n        <!--END-BUTTON FOR PASS STATE-->\n        \n        <script type="text/javascript" src="../../JS/Macro.js"></script>\n        <script type="text/javascript" src="MLE_LC2_HOA_2b_graded.js"></script>\n    </body>\n</html>')


# ### Grading

# In[24]:

import json   

def dist1D(xf,xi):
    #print xf,xi,xf-xi
    return xf-xi
    
def grader(e, ans):
    answer = json.loads(ans)#['answer']
    #return {'ok': False, 'msg': '%s' % str(answer)}
    
    deltaAD = dist1D(answer['AD2']['p1Y'],answer['AD1']['p1Y'])
    
    deltaSRAS = dist1D(answer['SRAS2']['p1Y'],answer['SRAS1']['p1Y'])
    if abs(deltaSRAS) > 0.1:
        return {'ok': False, 'msg': 'Incorrect. Please rethink your solution.'}
    
    if deltaAD < 0:
        if abs(deltaAD) > 0.5:
            return {'ok': True, 'msg': 'Good job.'}
        else:
            return {'ok': False, 'msg': 'Unable to discern size of shift. Try shifting frather from original position.'}
    elif deltaAD > 0:
        return {'ok': False, 'msg': 'Incorrect. Please rethink your solution.'}
    else:
        return {'ok': False, 'msg': 'Something is wrong with you solution. Have you shifted any of the draggable curves?'}

# import json   

# def dist1D(xf,xi):
#     #print xf,xi,xf-xi
#     return xf-xi
    
# def grader(e, ans):
#     answer = json.loads(ans)['answer']
    
#     ### For edX
#     #answer = json.loads(json.loads(ans)['answer'])
#     #return {'ok': False, 'msg': '%s' % str(answer)}
    
#     delta = dist1D(answer['dragLine']['p1Y'],answer['staticLine']['p1Y'])
    
#     if delta > 0:
#         if delta > 0.5:
#             return {'ok': True, 'msg': 'Good job.'}
#     elif delta < 0:
#         return {'ok': False, 'msg': 'Please rethink your solution - explanation.'}
#     else:
#         return {'ok': False, 'msg': 'Something wrong with you solution. Be sure you are shifting the Orange line with your mouse.'}
    
print grader("huh?",state)




# ### Generate HTML File

# In[21]:

import re

#tmpfile = _i86
index_htmlinput = [ i for i,x in enumerate(_ih) if "run_cell_magic(u'HTML'" in x and "re.sub('%%HTML','',tmpfile)" not in x]

tmpfile = eval('_i%d' % int(index_htmlinput[-1]))
tmpfile = re.sub('%%HTML','',tmpfile)
tmpfile = re.sub(r'<!--START-BUTTON FOR PASS STATE(.*?)END-BUTTON FOR PASS STATE-->','',tmpfile,flags=re.DOTALL)
tmpfile = re.sub(r'//START-PASS STATE TO IPYTHON KERNEL(.*?)//END-PASS STATE TO IPYTHON KERNEL','',tmpfile,flags=re.DOTALL)
tmpfile = re.sub(r'src="../../JS/Macro.js"','src="Macro.js"',tmpfile,flags=re.DOTALL)
#tmpfile = re.sub(r'src="MLE_LC2_HOA_2b_graded.js"','src="/static/MLE_LC2_HOA_2b_graded.js"',tmpfile,flags=re.DOTALL)

filename = 'MLE_LC2_HOA_2b_graded'
html_filename = '%s.html' % filename

with open(html_filename,'w') as hfile:
    hfile.write(tmpfile)
print tmpfile


# In[ ]:



