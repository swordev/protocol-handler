Dim FSO: Set FSO = CreateObject("Scripting.FileSystemObject")
Dim Shell: Set Shell = CreateObject("WScript.Shell")
dirname = FSO.GetParentFolderName(WScript.ScriptFullName)
Shell.Run "node " & dirname & "\\..\\lib\\bin open " & WScript.Arguments(0), 0, True