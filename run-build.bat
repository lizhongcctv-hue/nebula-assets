@echo off
cd /d C:\Users\lizho\.qclaw\workspace\nebula-next
call npm run build > build-output.txt 2>&1
echo Exit code: %ERRORLEVEL% >> build-output.txt
