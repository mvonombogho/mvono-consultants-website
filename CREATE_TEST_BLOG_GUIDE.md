# Create Test Blog - Manual Steps Guide

## Method 1: Using the Script (Automated)

### Prerequisites:
1. You need a Sanity API token with write permissions
2. Add the token to your environment variables

### Getting a Sanity API Token:
1. Go to https://www.sanity.io/manage/personal/tokens
2. Create a new token with "Editor" permissions
3. Copy the token

### Setting up the token:
1. Open your `.env.local` file
2. Add: `SANITY_API_TOKEN=your-token-here`

### Run the script:
```bash
cd C:\Users\Admin\Documents\mvono-consultants-website-main\mvono-consultants-website-main
node create-test-blog.js
```

---

## Method 2: Manual Creation via Studio (Recommended)

### Step 1: Start Your Development Server
```bash
cd C:\Users\Admin\Documents\mvono-consultants-website-main\mvono-consultants-website-main
npm run dev
```

### Step 2: Access Sanity Studio
Open your browser and go to: `http://localhost:3000/studio`

### Step 3: Create a Team Member First
1. In Sanity Studio, click on "Team Members"
2. Click "Create" or the "+" button
3. Fill in the following details:

**Full Name:** Engineer Donald M Mbogho
**Slug:** donald-m-mbogho (will auto-generate)
**Position/Title:** Managing Director & Chief Engineer
**Biography:** Engineer Donald M Mbogho is the Managing Director and founder of Mvono Consultants, bringing over 29 years of extensive experience in plant management, statutory inspection of pressure vessels, lifting equipment, refrigeration plant, energy management, and safety advisory services.
**Areas of Expertise:** 
- Plant Management
- Statutory Inspection
- Pressure Vessels
- Lifting Equipment
- Energy Management
- Safety Advisory

**Certifications:**
- Professional Engineer
- Certified Energy Manager
- Occupational Safety Specialist

**Email:** sales@mvonoconsultants.com
**Phone:** +254 720 270 694
**Display Order:** 1

4. Click "Publish"

### Step 4: Create the Test Blog Post
1. In Sanity Studio, click on "Blog Posts"
2. Click "Create" or the "+" button
3. Fill in the following details:

**Blog Title:** Essential Fire Safety Audit Guidelines for Kenyan Industries: Ensuring Compliance and Protection

**Slug:** fire-safety-audit-guidelines-kenyan-industries (will auto-generate)

**Author:** Select "Engineer Donald M Mbogho" from the dropdown

**Categories:** Select:
- Safety
- Compliance  
- Tips & Advice

**Published Date:** Click to set current date and time

**Summary:** Comprehensive guide to fire safety audits in Kenya, covering legal requirements, best practices, and industry-specific considerations for manufacturing, hospitality, and commercial sectors.

**Featured Post:** Toggle ON

### Step 5: Add Blog Content
In the "Blog Content" section, add the following structure:

**Paragraph 1:**
Fire safety audits are not just regulatory requirements in Kenya—they are essential safeguards that protect lives, property, and business continuity. With the increasing focus on workplace safety and the stringent enforcement of safety regulations by the Directorate of Occupational Safety and Health Services (DOSH), understanding fire safety audit requirements has become crucial for all industries.

**Heading 2:** Legal Framework and Compliance Requirements

**Paragraph:**
Under the Occupational Safety and Health Act 2007, all workplaces in Kenya must maintain adequate fire safety measures. The Act mandates regular fire safety audits, particularly for:

**Bullet List:**
- Manufacturing facilities with more than 20 employees
- Hotels, restaurants, and hospitality establishments
- Commercial buildings and shopping centers
- Educational institutions and healthcare facilities

**Heading 2:** Key Components of a Comprehensive Fire Safety Audit

**Heading 3:** 1. Fire Risk Assessment

**Paragraph:**
The foundation of any fire safety audit is a thorough risk assessment that identifies potential fire hazards, evaluates the likelihood of fire occurrence, and assesses the potential consequences. This includes examining electrical systems, heating equipment, storage of flammable materials, and human factors that could contribute to fire risks.

**Heading 3:** 2. Emergency Evacuation Procedures

**Paragraph:**
Effective evacuation procedures are critical for life safety. Our audits evaluate exit routes, emergency lighting, signage adequacy, and evacuation time calculations. We also assess the effectiveness of assembly points and communication systems during emergencies.

**Heading 2:** The Mvono Consultants Approach

**Paragraph:**
With over 29 years of experience in safety management, Mvono Consultants provides comprehensive fire safety audits that go beyond mere compliance. Our systematic approach includes:

**Numbered List:**
1. **Pre-audit Planning**: Detailed review of facility drawings, previous audit reports, and regulatory requirements
2. **On-site Assessment**: Comprehensive physical inspection using standardized checklists and advanced testing equipment
3. **Documentation Review**: Analysis of maintenance records, training documentation, and emergency procedures
4. **Detailed Reporting**: Comprehensive reports with prioritized recommendations and implementation timelines
5. **Follow-up Support**: Ongoing consultation to ensure effective implementation of recommendations

**Heading 2:** Conclusion and Next Steps

**Paragraph:**
Fire safety audits are essential investments in protecting what matters most—your people, property, and business operations. As Kenya continues to strengthen its safety regulations and enforcement, proactive fire safety management becomes increasingly important for business success.

**Paragraph:**
If your organization needs a comprehensive fire safety audit or wants to improve its fire safety management systems, Mvono Consultants is ready to help. Contact us today at sales@mvonoconsultants.com or +254 720 270 694 to schedule your fire safety audit.

### Step 6: Add SEO Information
In the "SEO Information" section:

**Meta Title:** Fire Safety Audit Guidelines for Kenyan Industries | Mvono Consultants

**Meta Description:** Comprehensive fire safety audit services in Kenya. Expert guidance on compliance, risk assessment, and safety management for all industries. Contact Mvono Consultants today.

**Keywords:**
- fire safety audit Kenya
- DOSH compliance
- fire risk assessment
- workplace safety Kenya
- fire safety consulting
- occupational safety

### Step 7: Publish the Blog Post
1. Review all the content
2. Click "Publish"

## Verification
After creating the blog post, you can verify it by:
1. Going to your blog page on the website
2. Checking if the post appears in the studio
3. Confirming all fields are properly filled

## Next Steps
1. Add a main image to the blog post
2. Create more blog posts
3. Add more team members
4. Explore the document generation features
5. Test the lead capture forms

---

## Troubleshooting
- If you can't access the studio, make sure your dev server is running
- If fields are missing, check the schema files in `/sanity/schemaTypes/`
- If you get permission errors, verify your Sanity project configuration
