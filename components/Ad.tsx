import Script from "next/script";

export default function Ad({label="ADVERTISEMENT"}:{label?:string;code?:string|null}){
  return (
    <div className="ad" style={{minHeight:250}}>
      <Script
        src="https://bauval.org/21/ec2fb650d44e0df1fbf5ae621aac6f30"
        strategy="afterInteractive"
        data-cfasync="false"
      />
      <div id="container-ec2fb650d44e0df1fbf5ae621aac6f30" />
    </div>
  );
}