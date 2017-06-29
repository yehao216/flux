@echo off
SET JSFOLDER=bundle
chdir /d %JSFOLDER%
for /r . %%a in (*.js) do (
    @echo loading...... %%~a ...
    uglifyjs %%~fa  -o %%~fa
)
echo 完成!
pause & exit