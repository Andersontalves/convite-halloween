@echo off
echo ===================================================
echo   PUBLICANDO CONVITE DE HALLOWEEN NO GITHUB
echo ===================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ===================================================
    echo   SUCESSO! Arquivos enviados para o GitHub!
    echo   Acesse: https://github.com/Andersontalves/convite-halloween
    echo ===================================================
) else (
    echo [!] Se deu erro, verifique se voce ja criou o repositorio em:
    echo     https://github.com/new?name=convite-halloween
)
echo.
pause
