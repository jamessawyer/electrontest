!macro preInit
    SetRegView 64
    ReadRegStr $0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\{GUID}" "UninstallString"
    ${If} $0 == ''
        WriteRegStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files (x86)\hello"
    ${Endif}
    SetRegView 32
    ReadRegStr $0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\{GUID}" "UninstallString"
    ${If} $0 == ''
        WriteRegStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Program Files (x86)\hello"
    ${Endif}
!macroend
