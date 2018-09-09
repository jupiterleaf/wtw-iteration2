using System.Web;
using System.Web.Optimization;

namespace wtw
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));
            bundles.Add(new ScriptBundle("~/bundles/vendors").Include(
                    "~/assets/vendors/jquery/jquery.min.js",
                    "~/assets/vendors/imagesloaded/imagesloaded.pkgd.js",
                    "~/assets/vendors/isotope-layout/isotope.pkgd.js",
                    "~/assets/vendors/jquery.countdown/jquery.countdown.min.js",
                    "~/assets/vendors/jquery.countTo/jquery.countTo.min.js",
                    "~/assets/vendors/jquery.countUp/jquery.countup.min.js",
                    "~/assets/vendors/jquery.matchHeight/jquery.matchHeight.min.js",
                    "~/assets/vendors/jquery.mb.ytplayer/jquery.mb.YTPlayer.min.js",
                    "~/assets/vendors/magnific-popup/jquery.magnific-popup.min.js",
                    "~/assets/vendors/masonry-layout/masonry.pkgd.js",
                    "~/assets/vendors/owl.carousel/owl.carousel.js",
                    "~/assets/vendors/jquery.waypoints/jquery.waypoints.min.js",
                    "~/assets/vendors/menu/menu.min.js",
                    "~/assets/vendors/smoothscroll/SmoothScroll.min.js",
                    "~/assets/js/main.js",
                    "~/assets/vendors/bootstrap4/js/bootstrap.min.js",
                    "~/assets/vendors/bootstrap4/js/bootstrap.js"
                    ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/assets/css/main.css",
                      "~/assets/fonts/fontawesome/font-awesome.min.css",
                      "~/assets/fonts/themify-icons/themify-icons.css",
                      "~/assets/vendors/bootstrap4/bootstrap-grid.min.css",
                      "~/assets/vendors/magnific-popup/magnific-popup.min.css",
                      "~/assets/vendors/owl.carousel/owl.carousel.css",
                      "~/assets/vendors/_jquery/jquery.min.css",
                      "~/assets/vendors/bootstrap4/bootstrap-grid.css",
                      "~/assets/vendors/bootstrap4/bootstrap.css",
                      "~/assets/vendors/bootstrap4/bootstrap-min.css"));
        }
    }
}
