cfg.Light, cfg.MUI, cfg.Portrait;

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" )
lay2= app.CreateLayout( "Linear", "Horizontal,FillX" )
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

