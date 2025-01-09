cfg.Light, cfg.MUI, cfg.Portrait;

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" )
lay2= app.CreateLayout( "Linear", "Horizontal,FillX" )
CreateActionBar()
lay.AddChild( lay2 );
	//Create a text label and add it to layout.
	txt = app.CreateTextEdit( "Enter the url or keyword here", 0.75, 0.065);
	txt.SetTextSize( 16 );
	txt.SetBackColor( MUI.colors.green)
	//txt.SetBackGradient(  MUI.colors.blue.darken4, MUI.colors.blue, MUI.colors.blue.lighten1);
	txt.SetOnChange( ReCreateQR );
	txt.SetOnFocus( txt_Focus )
	lay2.AddChild( txt );
	
	btn = app.CreateButton( "Save", 0.25, 0.065 );
	btn.SetOnTouch( btn_OnTouch )
	
	lay2.AddChild( btn );
	
	web = app.CreateWebView( 1, -1, "IgnoreErrors" );
	lay.AddChild( web );
	
	
	
	//Add layout to app.	
	app.AddLayout( lay );
	app.ShowPopup( "Enter url for the qrcode" );
	app.Wait( 2, false );
	txt.Focus();
}

function btn_OnTouch ()
{
app.ScreenShot( "/storage/emulated/0/Download/QR.jpg", 100);
app.GetThumbnail( "/storage/emulated/0/Download/QR.jpg", "/storage/emulated/0/Download/QR.png", DW()/3, DH()/3);
//web.Execute( "alert(document.body.outerHTML);" );
	//web.Execute( "ForceDownload(document.getElementsByTagName('img')[0].src, prompt('Name for the qrcode'));");
}

function txt_Focus()
{
	app.ShowKeyboard( txt )
	txt.SetText( "" )
}

function ReCreateQR()
{
	var contents = app.ReadFile("QRCodeWeb.html").replace("[CODE]", txt.GetText());
	web.LoadHtml( contents );
}

//Create an action bar at the top.
function CreateActionBar()
{
    //Create horizontal layout for top bar.
    layHoriz = app.CreateLayout( "Linear", "Horizontal,FillX,Left" );
    layHoriz.SetBackGradient("#2063D2","#3174E3", "#4285F4");
    lay.AddChild( layHoriz );
    
    //Create menu (hamburger) icon .
    txtMenu = app.CreateText( "[fa-home]", -1,-1, "FontAwesome" );
    txtMenu.SetPadding( 12,10,12,10, "dip" );
    txtMenu.SetTextSize( 28 );
    txtMenu.SetTextColor( "#ffffff" );
txtMenu.SetTextShadow( 7,0,0,"#000000" );
    txtMenu.SetOnTouchUp( function(){/*app.OpenDrawer()*/} );
    layHoriz.AddChild( txtMenu );
    
    //Create layout for title box.
    layBarTitle = app.CreateLayout( "Linear", "Horizontal" );
    layBarTitle.SetSize( 0.73 );
    layHoriz.AddChild( layBarTitle );
    
    //Create title.
    txtBarTitle = app.CreateText( app.GetAppName(), -1,-1, "Left" );
    txtBarTitle.SetMargins(0,6,0,0,"dip");
    txtBarTitle.SetTextSize( 24);
    txtBarTitle.SetTextColor( "#ffffff" );
txtBarTitle.SetTextShadow( 7,0,0,"#000000" );
    layBarTitle.AddChild( txtBarTitle );
    
    
    //Create search icon.
    txtSearch = app.CreateText( "[fa-power-off]", -1,-1, "FontAwesome" );
    txtSearch.SetPadding( 0,10,0,10, "dip" );
    txtSearch.SetTextSize( 28 );
    txtSearch.SetTextColor( "#ffffff" );
txtSearch.SetTextShadow( 7,0,0,"#000000" );
    txtSearch.SetOnTouchUp( ()=>{app.Exit(true);} );
    layHoriz.AddChild( txtSearch );
    
}