cfg.Light, cfg.MUI, cfg.Portrait;

function OnStart()
{
//app.PinScreen(  true )
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" );
	tabs = app.CreateTabs( "QRCode,3 of 9,Libre", 1, -1,"Fade");
	tabs.SetOnChange(tabs_OnChange);
lay2= app.CreateLayout( "Linear", "Horizontal,FillX" )
lay22= app.CreateLayout( "Linear", "Horizontal,FillX" )
CreateActionBar();
lay.AddChild( tabs );
tab1 = tabs.GetLayout("QRCode");
tab2  = tabs.GetLayout("3 of 9");
tab3  = tabs.GetLayout("Libre");
tab1.AddChild(lay2  );
tab2.AddChild(lay22  );
	txt = app.CreateTextEdit( "Enter the url or keyword here", 0.75, 0.065);
	txt.SetTextSize( 16 );
	txt.SetBackColor( MUI.colors.green);
	txt.SetOnChange( ReCreateQR );
	txt.SetOnFocus( txt_Focus );
	lay2.AddChild( txt );
	btn = app.CreateButton( "Save", 0.25, 0.065 );
	btn.SetOnTouch( btn_OnTouch );
	lay2.AddChild( btn );
	tab2.AddChild(lay22  );
	txt1 = app.CreateTextEdit( "Enter the barcode info", 0.75, 0.065);
	txt1.SetTextSize( 16 );
	txt1.SetBackColor( MUI.colors.green);
txt1.SetOnChange( ReCreate3of9);
txt1.SetOnFocus( txt1_Focus );
	lay22.AddChild( txt1 );
	txt11= app.CreateText( "", 0.95, 0.065);
	txt11.SetMargins( 0.01, 0.01, 0.01, 0.01 );
	txt11.SetFontFile( "Misc/free3of9.ttf");//Misc/3OF9_NEW.TTF");//Misc/BarcodeFont.ttf");//Misc/fre3of9x.ttf" )
	txt11.SetTextSize( 64);
tab2.AddChild(txt11);
	btn1 = app.CreateButton( "Save", 0.25, 0.065 );
	btn1.SetOnTouch( btn1_OnTouch );
	lay22.AddChild( btn1 );
	web = app.CreateWebView( 1, -1, "IgnoreErrors" );
	tab1.AddChild( web );
	btn2 = app.CreateButton( "Share", 0.25, 0.065 );
	btn2.SetOnTouch( btn2_OnTouch )
	tab1.AddChild( btn2 );
	app.AddLayout( lay );
	app.ShowPopup( "Enter url for the qrcode" );
	app.Wait( 1, false );
	
	txt.Focus();
}

function tabs_OnChange(name) {
	if(name==="3 of 9") {
		txt1.Focus();
	}
}

function btn_OnTouch() {
	web.Capture( pro = prompt("Enter the path to save the qrcode:","/storage/emulated/0/Download/QR.jpg" ));
}

function btn2_OnTouch() {
	if (typeof pro == "undefined") btn_OnTouch();
	app.SendFile( pro );
}

function btn1_OnTouch() {
	var p = "barcode.png"; //prompt("Name for the barcode image:")
	app.ScreenShot(  "/storage/emulated/0/Download/" + p);
	img = app.CreateImage( "/storage/emulated/0/Download/" + p, 1, -1 );
	img.SetPixelMode( true );
	var pixelData = img.GetPixelData( "pngbase64", 0,  540, 1080, 185 );
	app.WriteFile( "/storage/emulated/0/Download/rssImages/imAPK.png", pixelData, "Base64");
	pixelData = "data:image/png;base64," + pixelData;
	dlg = app.CreateDialog( "Barcode", "FillScreen");
	layDlg = app.CreateLayout( "Linear", "VCenter,FillXY" );
dlg.AddLayout( layDlg );
web = app.CreateWebView( 1, -1 );
web.LoadHtml( "<br><img src='" + pixelData + "' width='90%' /><br>" );
layDlg.AddChild( web );
dlg.Show();
alert("This is the barcode image saved on the rssImages folder inside the Downloads");
if(confirm("Do you want to export the barcode image as a PDF document?")) web.Print();
/*
	alert(pixelData);
    var width = 100; // Set your image width
    var height = 100; // Set your image height

    // Create a canvas
    var canvas = app.CreateCanvas(width, height);
    var ctx = canvas.GetContext("2d");

    // Create ImageData object
    var imageData = ctx.CreateImageData(width, height);
    imageData.data.set(pixelData); // Set the pixel data

    // Put the ImageData onto the canvas
    ctx.putImageData(imageData, 0, 0);

    // Convert canvas to Base64 PNG
    var base64PNG = canvas.ToDataURL("image/png");

    // Now you can use base64PNG as needed
    app.ShowPopup("Image saved as Base64 PNG: " + base64PNG);
    */
}

function txt_Focus() {
	app.ShowKeyboard( txt );
	txt.SetText( "" );
}

function txt1_Focus() {
	app.ShowKeyboard( txt1 );
	txt1.SetText( "" );
}

function ReCreateQR() {
	var contents = app.ReadFile("QRCodeWeb.html").replace("[CODE]", txt.GetText());
	web.LoadHtml( contents );
}

function ReCreate3of9() {
	var contents = txt1.GetText().split("*").join("");
	txt11.SetText( "*" + contents + "*" );
	app.ShowPopup(txt11.GetText());
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