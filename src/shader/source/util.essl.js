define(function () {
return "// Use light attenuation formula in\n// http://blog.slindev.com/2011/01/10/natural-light-attenuation/\n@export buildin.util.calculate_attenuation\n\nuniform float attenuationFactor : 5.0;\n\nfloat lightAttenuation(float dist, float range)\n{\n    float attenuation = 1.0;\n    attenuation = dist*dist/(range*range+1.0);\n    float att_s = attenuationFactor;\n    attenuation = 1.0/(attenuation*att_s+1.0);\n    att_s = 1.0/(att_s+1.0);\n    attenuation = attenuation - att_s;\n    attenuation /= 1.0 - att_s;\n    return clamp(attenuation, 0.0, 1.0);\n}\n\n@end\n\n//http://codeflow.org/entries/2012/aug/02/easy-wireframe-display-with-barycentric-coordinates/\n@export buildin.util.edge_factor\n\nfloat edgeFactor(float width)\n{\n    vec3 d = fwidth(v_Barycentric);\n    vec3 a3 = smoothstep(vec3(0.0), d * width, v_Barycentric);\n    return min(min(a3.x, a3.y), a3.z);\n}\n\n@end\n\n// Pack depth\n// Float value can only be [0.0 - 1.0) ?\n@export buildin.util.encode_float\nvec4 encodeFloat(const in float depth)\n{\n    const vec4 bitShifts = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);\n    const vec4 bit_mask  = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);\n    vec4 res = fract(depth * bitShifts);\n    res -= res.xxyz * bit_mask;\n\n    return res;\n}\n@end\n\n@export buildin.util.decode_float\nfloat decodeFloat(const in vec4 colour)\n{\n    const vec4 bitShifts = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0 );\n    return dot(colour, bitShifts);\n}\n@end\n\n// http://graphicrants.blogspot.com/2009/04/rgbm-color-encoding.html\n@export buildin.util.rgbm_decode\nvec3 RGBMDecode(vec4 rgbm, float range) {\n  return range * rgbm.rgb * rgbm.a;\n}\n@end\n\n@export buildin.util.rgbm_encode\nvec4 RGBMEncode(vec3 color, float range) {\n    vec4 rgbm;\n    color *= 1.0 / range;\n    rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6 ) ), 0.0, 1.0);\n    rgbm.a = ceil(rgbm.a * 255.0) / 255.0;\n    rgbm.rgb = color / rgbm.a;\n    return rgbm;\n}\n@end\n\n@export buildin.chunk.skin_matrix\n\n// Weighted Sum Skinning Matrix\nmat4 skinMatrixWS;\nif (joint.x >= 0.0)\n{\n    skinMatrixWS = skinMatrix[int(joint.x)] * weight.x;\n}\nif (joint.y >= 0.0)\n{\n    skinMatrixWS += skinMatrix[int(joint.y)] * weight.y;\n}\nif (joint.z >= 0.0)\n{\n    skinMatrixWS += skinMatrix[int(joint.z)] * weight.z;\n}\nif (joint.w >= 0.0)\n{\n    skinMatrixWS += skinMatrix[int(joint.w)] * (1.0-weight.x-weight.y-weight.z);\n}\n@end\n";
});